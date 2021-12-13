import React, { useState, useEffect } from "react";
import { FaMicrophone, FaRegStopCircle } from "react-icons/fa";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import "./Compose.css";

const Compose = ({ setShowCompose }) => {
  const { listening, transcript, resetTranscript } = useSpeechRecognition();
  SpeechRecognition.continuous = false;

  const [recognizedText, setRecognizedText] = useState("");
  const [sent, setSent] = useState(false);
  const [mailSent, setMailSent] = useState(false);
  const [formDetails, setFormDetails] = useState({
    to: "",
    subject: "",
    body: "",
  });

  const [micShow, setMicShow] = useState({
    mic1: true,
    mic2: true,
  });

  const [error, setError] = useState({
    to: "",
    subject: "",
    body: "",
  });

  const changeHandler = (e) => {
    setError({ ...error, [e.target.name]: "" });
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    let timer;
    if (sent) {
      timer = setTimeout(() => {
        setShowCompose(false);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [sent]);

  useEffect(() => {
    if (transcript) setRecognizedText(transcript);
  }, [transcript]);

  const mic1Handler = (e) => {
    if (micShow.mic1) {
      setRecognizedText("");
      resetTranscript();
      SpeechRecognition.startListening();
      setMicShow({ ...micShow, mic2: true, mic1: false });
    } else {
      SpeechRecognition.stopListening();
      let output = formDetails.subject + " " + recognizedText;
      setFormDetails({ ...formDetails, subject: output });
      setMicShow({ ...micShow, mic2: true, mic1: true });
      resetTranscript();
      setRecognizedText("");
    }
  };

  const mic2Handler = (e) => {
    if (micShow.mic2) {
      setRecognizedText("");
      resetTranscript();
      SpeechRecognition.startListening();
      setMicShow({ ...micShow, mic1: true, mic2: false });
    } else {
      SpeechRecognition.stopListening();
      let output = formDetails.body + " " + recognizedText;
      setFormDetails({ ...formDetails, body: output });
      setMicShow({ ...micShow, mic1: true, mic2: true });
      resetTranscript();
      setRecognizedText("");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    setMailSent(true);

    let status;
    const userToken = JSON.parse(localStorage.getItem("token"));
    fetch("http://localhost:8080/mail/send", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(formDetails),
    })
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((data) => {
        if (status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          window.location.href = "http://localhost:3000/sign-in";
        }
        if (status === 404) {
          setError(data.data);
        } else {
          setSent(true);
        }
        setMailSent(false);
      })
      .catch((err) => console.log(err));
  };

  let subjectClassName = "input";
  let bodyClassName = "input";
  let toClassName = "input";
  if (formDetails.to) {
    toClassName += " valid";
  }
  if (error.to) {
    toClassName += " error";
  }
  if (formDetails.subject) {
    subjectClassName += " valid";
  }
  if (listening && !micShow.mic1) {
    subjectClassName += " listening";
  }
  if (error.subject) {
    subjectClassName += " error";
  }

  if (formDetails.body) {
    bodyClassName += " valid";
  }
  if (listening && !micShow.mic2) {
    bodyClassName += " listening";
  }
  if (error.body) {
    bodyClassName += " error";
  }

  return (
    <div className="compose">
      <div className="compose_container">
        <div className="header">
          <h2>Compose Mail</h2>
        </div>
        <div className="form">
          <div className="ipContainer">
            <div className="input-group">
              <input
                className={toClassName}
                type="email"
                name="to"
                id="to"
                value={formDetails.to}
                onChange={changeHandler}
              />
              <label htmlFor="to">To</label>
            </div>
            <span>{error.to}</span>
          </div>

          <div className="ipContainer">
            <div className="input-group">
              <input
                className={subjectClassName}
                type="text"
                name="subject"
                id="subject"
                value={formDetails.subject}
                onChange={changeHandler}
              />
              <label htmlFor="subject">Subject</label>
              {micShow.mic1 ? (
                <FaMicrophone onClick={mic1Handler} className="mic1" />
              ) : (
                <FaRegStopCircle onClick={mic1Handler} className="mic1" />
              )}
            </div>
            <span>{error.subject}</span>
          </div>

          <div className="ipContainer">
            <div className="input-group">
              <textarea
                className={bodyClassName}
                type="text"
                name="body"
                id="body"
                value={formDetails.body}
                onChange={changeHandler}
              />
              <label htmlFor="body" className="body-label">
                Body
              </label>
              {micShow.mic2 ? (
                <FaMicrophone className="mic2" onClick={mic2Handler} />
              ) : (
                <FaRegStopCircle className="mic2" onClick={mic2Handler} />
              )}
            </div>
            <span>{error.subject}</span>
          </div>

          {sent && <span className="alertMessage">Mail sent successfully</span>}
          <div className="button-group">
            <span onClick={() => setShowCompose(false)}>Cancel</span>
            <span onClick={submitHandler} className={mailSent && "sent"}>
              Send
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compose;

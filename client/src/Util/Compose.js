import React, { useState, useEffect } from "react";
import { FaMicrophone, FaRegStopCircle } from "react-icons/fa";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import "./Compose.css";

const Compose = ({ setShowCompose }) => {
  const {
    transcript,
    resetTranscript,
  } = useSpeechRecognition();
  SpeechRecognition.continuous = false;

  const [recognizedText, setRecognizedText] = useState('');

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

//   this is surya
// im audible

  useEffect(() => {
    if(transcript)
        setRecognizedText(transcript);
  }, [transcript]);

  const mic1Handler = (e) => {
    if(micShow.mic1) {
      resetTranscript();
      SpeechRecognition.startListening();
      setMicShow({ ...micShow, mic2: true, mic1: false });
    }
    else {
      SpeechRecognition.stopListening();
      let output = formDetails.subject + ' ' + recognizedText;
      setFormDetails({...formDetails, subject: output});
      setMicShow({ ...micShow, mic2: true, mic1: true });
      resetTranscript();
      setRecognizedText('');
    }    
  }
  
  const mic2Handler = (e) => {
    if(micShow.mic2) {
      resetTranscript();
      SpeechRecognition.startListening();
      setMicShow({ ...micShow, mic1: true, mic2: false });
    }
    else {
      SpeechRecognition.stopListening();
      let output = formDetails.body + ' ' + recognizedText;
      setFormDetails({...formDetails, body: output});
      setMicShow({ ...micShow, mic1: true, mic2: true });
      resetTranscript();
      setRecognizedText('');
    }    
  }

  const submitHandler = (e) => {
    e.preventDefault();
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
        if (res.status == 200) {
          console.log("Mail sent");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="compose">
      <div className="compose_container">
        <div className="header">
          <h2>Compose Mail</h2>
        </div>
        <div className="form">
          <div className="input-group">
            <input
              className={formDetails.to ? "input valid" : "input"}
              type="email"
              name="to"
              id="to"
              value={formDetails.to}
              onChange={changeHandler}
            />
            <label htmlFor="to">To</label>
          </div>
          <div className="input-group">
            <input
              className={formDetails.subject ? "input valid" : "input"}
              type="text"
              name="subject"
              id="subject"
              value={formDetails.subject}
              onChange={changeHandler}
            />
            <label htmlFor="subject">Subject</label>
            {micShow.mic1 ? (
              <FaMicrophone
                onClick={mic1Handler}
                className="mic1"
              />
            ) : (
              <FaRegStopCircle
              onClick={mic1Handler}
                className="mic1"
              />
            )}
          </div>
          <div className="input-group">
            <textarea
              className={formDetails.body ? "input valid" : "input"}
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
              <FaMicrophone
                className="mic2"
                onClick={mic2Handler}
              />
            ) : (
              <FaRegStopCircle
                className="mic2"
                onClick={mic2Handler}
              />
            )}
          </div>
          <div className="button-group">
            <span onClick={() => setShowCompose(false)}>Cancel</span>
            <span onClick={submitHandler}>Send</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compose;

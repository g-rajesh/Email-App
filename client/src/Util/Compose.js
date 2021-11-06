import React, { useState } from "react";
import { FaMicrophone, FaRegStopCircle } from "react-icons/fa";

import "./Compose.css";

const Compose = ({ setShowCompose }) => {
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
                onClick={() =>
                  setMicShow({ ...micShow, mic2: true, mic1: false })
                }
                className="mic1"
              />
            ) : (
              <FaRegStopCircle
                onClick={() => setMicShow({ ...micShow, mic1: true })}
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
                onClick={() =>
                  setMicShow({ ...micShow, mic1: true, mic2: false })
                }
              />
            ) : (
              <FaRegStopCircle
                className="mic2"
                onClick={() => setMicShow({ ...micShow, mic2: true })}
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

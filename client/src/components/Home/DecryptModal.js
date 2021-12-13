import React, { useState } from "react";
import "./DecryptModal.css";

const DecryptModal = ({ setShowModal, decryptHandler }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = () => {
    const token = JSON.parse(localStorage.getItem("token"));

    let status;
    fetch("http://localhost:8080/mail/verifyPassword", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
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
        if (status === 200) {
          decryptHandler();
        } else {
          setError(data.data.password);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="modal">
      <div className="model-container">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password must be 6 characters long"
        />
        {error && <span className="error">{error}</span>}
        <div className="button-grp">
          <span
            onClick={() => {
              setShowModal(false);
            }}
          >
            Cancel
          </span>
          <span onClick={submitHandler}>Submit</span>
        </div>
      </div>
    </div>
  );
};

export default DecryptModal;

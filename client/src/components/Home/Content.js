import React, { useState, useEffect } from "react";
import ContentImage from "../../images/content.png";
import "./Content.css";

const Content = ({ user }) => {
  if (!user) {
    return (
      <div className="info">
        <img src={ContentImage} alt="email" />
        <h1>Select an email to view the contents</h1>
      </div>
    );
  }

  // const handleDecrypt = () => {
  //   decryptHandler(isDecrypted);
  //   setIsDecrypted((prevState) => !prevState);
  // }

  return (
    <div className="contents">
      <div className="header">
        <div className="left">
          <span>{user.name[0]}</span>
          <span>{user.sender}</span>
        </div>
        {/* {user.sentFromMailer && 
          <button className="right" onClick={handleDecrypt}>
            {isDecrypted ? "Encrypt" : "Decrypt"}
          </button>
        } */}
      </div>
      <div className="body">
        <p>{user.subject}</p>
        <p>{user.body}</p>
      </div>
    </div>
  );
};

export default Content;

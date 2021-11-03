import React from "react";

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

  return (
    <div className="contents">
      <div className="header">
        <div className="left">
          <span>{user.name[0]}</span>
          <span>{user.sender}</span>
        </div>
        <button className="right">Decrypt</button>
      </div>
      <div className="body">
        <p>{user.subject}</p>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default Content;

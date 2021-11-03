import React from "react";

import "./Inbox.css";

const Inbox = ({ setUser, data }) => {
  return (
    <div className="inbox">
      <h1>Inbox</h1>
      <ul className="inbox-items">
        {data.inbox.map((item) => {
          return (
            <li onClick={() => setUser(item)} key={item.name}>
              <span>{item.name[0]}</span>
              <div className="left">
                <h2>{item.name}</h2>
                <p>{item.email}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Inbox;

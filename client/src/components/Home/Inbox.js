import React from "react";

import "./Inbox.css";

const Inbox = ({ setUser, data, loading }) => {
  return (
    <div className="inbox">
      <h1>Inbox</h1>
      {
        loading ? <p className="loader">Loading...</p> : 
          <ul className="inbox-items">
          {data.map((item,index) => {
            return (
              <li onClick={() => setUser(item)} key={item.index}>
                <span>{item.name[0]}</span>
                <div className="left">
                  <h2>{item.name}</h2>
                  <p>{item.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      }
    </div>
  );
};

export default Inbox;

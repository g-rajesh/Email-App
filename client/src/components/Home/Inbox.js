import React from "react";
import { VscRefresh } from 'react-icons/vsc';

import "./Inbox.css";

const Inbox = ({ setUser, data, setData, loading, getMail }) => {

  const clickHandler = (item, index) => {
    setUser(item);
    const newData = data.map((item, i) => {
      item.active = false;
      if(i===index){
        item.active = true;
      }
      return item;
    })
    console.log(newData);
    setData(newData);
  }

  return (
    <div className="inbox">
      <div className="flex">
        <h1>Inbox</h1>
        <VscRefresh className="refresh" onClick={getMail}/>
      </div>
      {
        loading ? <p className="loader">Loading...</p> : 
          <ul className="inbox-items">
          {data.map((item,index) => {
            return (
              <li onClick={(e) => clickHandler(item, index)} key={index} className={item.active ? 'active':''}>
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

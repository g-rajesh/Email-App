import React, { useState, useEffect } from "react";

import { useGlobalContext } from "../../store/context";
import Navbar from "./Navbar";
import Inbox from "./Inbox";
import Content from "./Content";
import "./Home.css";
import Compose from "../../Util/Compose";
import {decryptData, encryptData} from '../../Util/functions';

const Home = () => {
  const [user, setUser] = useState(null);
  const [showCompose, setShowCompose] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const ctx = useGlobalContext();

  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem('token'));
    setLoading(true);
    fetch('http://localhost:8080/mail/receive',{
      headers:{
        Authorization:`Bearer ${token}`,
      }
    })
    .then(res => res.json())
    .then(result => {
      console.log(result);
      const inbox = result.data.map((mail,index) => {
        let name='Me',sender=mail.from.text;
        const senderMail = mail.from.text;
        if(senderMail.includes('<')){
          name = senderMail.slice(0,senderMail.indexOf('<'));
          sender = senderMail.slice(senderMail.indexOf('<')+1,senderMail.length-1);
        }
        return {
          id: index,
          name,
          sender,
          subject: mail.subject,
          body: mail.text,
          sentFromMailer: mail.sentFromMailer
        };
      })
      setData(inbox);
      setLoading(false);
    })
    .catch(err => console.log(err));
  },[])

  const decryptHandler = (decrypted) => {
    if(!decrypted){
      setUser({
        ...user,
        subject: decryptData(user.subject),
        body: decryptData(user.body)
      })
    } else {
      setUser({
        ...user,
        subject: encryptData(user.subject),
        body: encryptData(user.body)
      })
    }
  }
  return (
    <div className="Home">
      <Navbar setShowCompose={setShowCompose} />
      {showCompose && <Compose setShowCompose={setShowCompose} />}
      <div className="container">
        <Inbox data={data} setUser={setUser} loading={loading} />
        <Content user={user} decryptHandler={decryptHandler} />
      </div>
    </div>
  );
};

export default Home;

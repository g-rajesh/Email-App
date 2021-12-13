import React, { useState, useEffect } from "react";

import { useGlobalContext } from "../../store/context";
import Navbar from "./Navbar";
import Inbox from "./Inbox";
import Content from "./Content";
import "./Home.css";
import Compose from "../../Util/Compose";
import DecryptModal from "./DecryptModal";
import { decryptData, encryptData } from "../../Util/functions";

const Home = () => {
  const [user, setUser] = useState(null);
  const [showCompose, setShowCompose] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const ctx = useGlobalContext();

  const getMail = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    setLoading(true);

    let status;
    fetch("http://localhost:8080/mail/receive", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((result) => {
        console.log(result);
        if (status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          window.location.href = "http://localhost:3000/sign-in";
        } else {
          const inbox = result.data.map((mail, index) => {
            let name = "Me",
              sender = mail.from.text;
            const senderMail = mail.from.text;
            if (senderMail.includes("<")) {
              name = senderMail.slice(0, senderMail.indexOf("<"));
              sender = senderMail.slice(
                senderMail.indexOf("<") + 1,
                senderMail.length - 1
              );
            }
            return {
              id: index,
              name,
              sender,
              subject: mail.subject,
              body: mail.text,
              sentFromMailer: mail.sentFromMailer,
            };
          });
          setData(inbox);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getMail();
  }, []);

  const decryptHandler = () => {
    const newUser = data.map((user) => {
      if (!user.sentFromMailer) return user;
      return {
        ...user,
        subject: decryptData(user.subject),
        body: decryptData(user.body),
      };
    });

    setUser(null);

    setData(newUser);
    setShowModal(false);
    setIsDecrypted(true);
  };

  const encryptHandler = () => {
    const newUser = data.map((user) => {
      if (!user.sentFromMailer) return user;
      return {
        ...user,
        subject: encryptData(user.subject),
        body: encryptData(user.body),
      };
    });

    setData(newUser);
    setUser(null);
    setIsDecrypted(false);
  };

  return (
    <div className="Home">
      <Navbar
        setShowCompose={setShowCompose}
        setShowModal={setShowModal}
        isDecrypted={isDecrypted}
        setIsDecrypted={setIsDecrypted}
        decryptHandler={decryptHandler}
        encryptHandler={encryptHandler}
      />
      {showCompose && <Compose setShowCompose={setShowCompose} />}
      {showModal && (
        <DecryptModal
          setShowModal={setShowModal}
          decryptHandler={decryptHandler}
        />
      )}
      <div className="container">
        <Inbox
          data={data}
          setData={setData}
          setUser={setUser}
          loading={loading}
          getMail={getMail}
        />
        <Content user={user} />
      </div>
    </div>
  );
};

export default Home;

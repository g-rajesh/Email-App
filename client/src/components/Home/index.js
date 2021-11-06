import React, { useState } from "react";

import { useGlobalContext } from "../../store/context";
import Navbar from "./Navbar";
import Inbox from "./Inbox";
import Content from "./Content";
import "./Home.css";
import Compose from "../../Util/Compose";

const data = {
  inbox: [
    {
      name: "Believer",
      sender: "believer@gmail.com",
      subject: "Lorem ipsum dolor sit amet",
      email:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi velit labore aperiam dolorem eos et fugiat ab facilis perferendis vitae, non molestiae recusandae ipsum asperiores alias voluptatum rerum magni consectetur.",
    },
    {
      name: "Guhan",
      sender: "guhan@gmail.com",
      subject: "Lorem ipsum dolor sit amet",
      email:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi velit labore aperiam dolorem eos et fugiat ab facilis perferendis vitae, non molestiae recusandae ipsum asperiores alias voluptatum rerum magni consectetur.",
    },
    {
      name: "Dhansuh",
      sender: "dhanush@gmail.com",
      subject: "Lorem ipsum dolor sit amet",
      email:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi velit labore aperiam dolorem eos et fugiat ab facilis perferendis vitae, non molestiae recusandae ipsum asperiores alias voluptatum rerum magni consectetur.",
    },
    {
      name: "Rajesh",
      sender: "rajesh@gmail.com",
      subject: "Lorem ipsum dolor sit amet",
      email:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi velit labore aperiam dolorem eos et fugiat ab facilis perferendis vitae, non molestiae recusandae ipsum asperiores alias voluptatum rerum magni consectetur.",
    },
  ],
};

const Home = () => {
  const [user, setUser] = useState(null);
  const [showCompose, setShowCompose] = useState(false);

  const ctx = useGlobalContext();

  return (
    <div className="Home">
      <Navbar setShowCompose={setShowCompose} />
      {showCompose && <Compose setShowCompose={setShowCompose} />}
      <div className="container">
        <Inbox data={data} setUser={setUser} />
        <Content user={user} />
      </div>
    </div>
  );
};

export default Home;

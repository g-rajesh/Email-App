import React, { useState } from "react";

function Summa() {
  const [content, setContent] = useState("");

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.onstart = () => {
    console.log("Speek");
  };

  recognition.onresult = (e) => {
    console.log(e);
  };

  const listenHandler = () => {
    recognition.start();
  };

  return (
    <div>
      <button onClick={listenHandler}>Talk</button>
      <p>{content}</p>
    </div>
  );
}

export default Summa;

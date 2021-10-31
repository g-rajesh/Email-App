import React, { useState, useEffect, useRef } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const InputField = (props) => {
  const [eye, setEye] = useState(false);
  const inputRef = useRef();
  
  if (props.label === "Password") {
    props.properties.type = "password";
  }
  if (props.label === "Password" && eye) {
    props.properties.type = "text";
  }

  let classname = "input";
  if(props.properties.className) {
    classname += " " + props.properties.className
  }
  if(props.error){
    classname += " " + "error";
  }

  console.log(classname)

  useEffect(() => {
    if(props.auto_focus){
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="field">
      <div className="field-group">
        <input
          ref={inputRef}
          {...props.properties}
          className={classname}
          autoComplete="off"
        />
        <label htmlFor={props.id}>{props.label}</label>
        {props.label === "Password" ? (
          !eye ? (
            <FaEyeSlash onClick={() => setEye(!eye)} className="eyeIcon" />
          ) : (
            <FaEye onClick={() => setEye(!eye)} className="eyeIcon" />
          )
        ) : null}
      </div>
      {props.error && <span className="error">{props.error}</span>}
    </div>
  );
};

export default InputField;

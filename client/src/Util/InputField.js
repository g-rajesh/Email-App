import React, { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const InputField = (props) => {
  const [eye, setEye] = useState(false);

  if (props.label === "Password") {
    props.properties.type = "password";
  }
  if (props.label === "Password" && eye) {
    props.properties.type = "text";
  }

  return (
    <div className="field-group">
      <input
        className={`input ${props.className}`}
        {...props.properties}
        autoComplete="off"
        required
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
  );
};

export default InputField;

import React from "react";

const InputField = (props) => {
  console.log(props);
  return (
    <div className="field-group">
      <label htmlFor={props.id}>{props.label}</label>
      <input className={`input ${props.className}`} {...props.properties} />
    </div>
  );
};

export default InputField;

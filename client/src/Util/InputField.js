import React, { Fragment } from "react";

const InputField = (props) => {
  console.log(props);
  return (
    <Fragment>
      <label htmlFor={props.id}>{props.label}</label>
      <input className={`input ${props.className}`} {...props.properties} />
    </Fragment>
  );
};

export default InputField;

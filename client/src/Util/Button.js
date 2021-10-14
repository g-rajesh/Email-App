import React from "react";

const Button = (props) => {
  return (
    <button className={`btn ${props.className}`} {...props.properties}>
      {props.children}
    </button>
  );
};

export default Button;

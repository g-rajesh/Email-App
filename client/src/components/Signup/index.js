import react, { useState } from "react";

import "./Signup.css";
import Button from "../../Util/Button";
import InputField from "../../Util/InputField";

const Signup = () => {
  return (
    <div className="signup">
      <div className="left">
        <div className="container">
            <h2 className="title">Sign up</h2>
            <form className="form">
            <InputField label="First Name" properties={{ id: "firstName", type: "text" }} />
            <InputField label="Last Name" properties={{ id: "lastName", type: "text" }} />
            <InputField label="Email" properties={{ id: "email", type: "email" }} />
            <InputField label="Password" properties={{ id: "password", type: "password" }} />
            <Button>Submit</Button>
            </form>
        </div>
      </div>
      <div className="right">
      </div>
    </div>
  );
};

export default Signup;

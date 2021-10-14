import react, { useState } from "react";

import { MdEmail } from "react-icons/md";
import Button from "../../Util/Button";
import InputField from "../../Util/InputField";

const Signup = () => {
  return (
    <div className="signup">
      <div className="left">
        <h2 className="title">Sign up</h2>
        <form className="form">
          <InputField label="Name" properties={{ id: "name", type: "text" }} />
          <Button>Submit</Button>
        </form>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Signup;

import react, { useState } from "react";
import { Link } from "react-router-dom";

import "./Signup.css";
import Button from "../../Util/Button";
import InputField from "../../Util/InputField";

const Signup = () => {
  const [formDetails, setFormDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formDetails);
  };

  return (
    <div className="signup">
      <div className="left">
        <div className="container">
          <h2 className="title">Sign up</h2>
          <form className="form" onSubmit={submitHandler}>
            <div className="name-group">
              <InputField
                label="First Name"
                properties={{
                  id: "firstName",
                  name: "firstName",
                  type: "text",
                  value: formDetails.firstName,
                  onChange: changeHandler,
                }}
              />
              <InputField
                label="Last Name"
                properties={{
                  id: "lastName",
                  name: "lastName",
                  type: "text",
                  value: formDetails.lastName,
                  onChange: changeHandler,
                }}
              />
            </div>

            <InputField
              label="Email"
              properties={{
                id: "email",
                type: "email",
                name: "email",
                value: formDetails.email,
                onChange: changeHandler,
              }}
            />
            <InputField
              label="Password"
              properties={{
                id: "password",
                type: "password",
                name: "password",
                value: formDetails.password,
                onChange: changeHandler,
              }}
            />
            <Button>Sign up</Button>
          </form>
          <p>
            Already registered?{" "}
            <Link to="/sign-in">
              <span className="redirect-link">Sign In</span>
            </Link>
          </p>
        </div>
      </div>
      <div className="right">
        <div className="container">
          <h1>
            Explore Your <br />
            Creativity
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
            quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
            mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
          </p>
          <span id="one"></span>
          <span id="two"></span>
          <span id="three"></span>
          <span id="four"></span>
          <span id="five"></span>
        </div>
      </div>
    </div>
  );
};

export default Signup;

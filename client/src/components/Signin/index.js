import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

import "./Signin.css";
import Button from "../../Util/Button";
import InputField from "../../Util/InputField";

const Signin = () => {
  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   console.log(formDetails);
  // };

  return (
    <div className="signin">
      <div className="left">
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
      <div className="right">
        <Link to="/" className="logo">
          <MdEmail />
          <span>Mailer</span>
        </Link>
        <div className="container">
          <h2 className="title">Sign in</h2>
          <form
            className="form"
            method="POST"
            action="http://localhost:3001/authenticate/user"
          >
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
            <Button>Sign in</Button>
          </form>
          <p>
            New user?{" "}
            <Link to="/sign-up">
              <span className="redirect-link">Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;

import { useState, useEffect } from "react";
import { MdEmail } from "react-icons/md";
import { Link, useHistory } from "react-router-dom";

import "./Signup.css";
import Button from "../../Util/Button";
import InputField from "../../Util/InputField";
import { storeUserDetails } from "../../Util/functions";
import { useGlobalContext } from "../../store/context";

const Signup = () => {
  const { showModalHandler } = useGlobalContext();
  const ctx = useGlobalContext();
  console.log(ctx);

  const [formDetails, setFormDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [checkBox, setCheckBox] = useState(false);
  const history = useHistory();

  const changeHandler = (e) => {
    setError({ ...error, [e.target.name]: "" });
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let status;
    setError({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });

    fetch("http://localhost:8080/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDetails),
    })
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (status == 200) {
          console.log("Account created successfully");
          console.log(data);
          storeUserDetails(checkBox, formDetails);
          history.push("/");
        } else {
          console.log(data.data);
          if (data.data.showModal) {
            console.log(data.data);
            showModalHandler();
          }
          const res = data.data;
          setError(res);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="signup">
      <div className="left">
        <Link to="/" className="logo">
          <MdEmail />
          <span>Mailer</span>
        </Link>
        <div className="container">
          <h2 className="title">Sign up</h2>
          <form className="form" method="POST" onSubmit={submitHandler}>
            <div className="name-group">
              <InputField
                label="First Name"
                auto_focus
                error={error.firstName}
                properties={{
                  id: "firstName",
                  name: "firstName",
                  type: "text",
                  className: formDetails.firstName ? "valid" : "",
                  value: formDetails.firstName,
                  onChange: changeHandler,
                }}
              />
              <InputField
                label="Last Name"
                error={error.lastName}
                properties={{
                  id: "lastName",
                  name: "lastName",
                  type: "text",
                  className: formDetails.lastName ? "valid" : "",
                  value: formDetails.lastName,
                  onChange: changeHandler,
                }}
              />
            </div>

            <InputField
              label="Email"
              error={error.email}
              properties={{
                id: "email",
                type: "email",
                className: formDetails.email ? "valid" : "",
                name: "email",
                value: formDetails.email,
                onChange: changeHandler,
              }}
            />
            <InputField
              label="Password"
              error={error.password}
              properties={{
                id: "password",
                type: "password",
                className: formDetails.password ? "valid" : "",
                name: "password",
                value: formDetails.password,
                onChange: changeHandler,
              }}
            />

            <div className="remember">
              {formDetails.firstName &&
              formDetails.lastName &&
              formDetails.email &&
              formDetails.password ? (
                <input
                  type="checkbox"
                  name="remember"
                  id="remember"
                  onChange={() => setCheckBox(!checkBox)}
                />
              ) : (
                <input type="checkbox" name="remember" id="remember" disabled />
              )}
              <label htmlFor="remember">Remember me</label>
            </div>
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
            Reliable Way for
            <br />
            Mailing Mates
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

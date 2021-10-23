import { useState, useEffect } from "react";
import { MdEmail } from "react-icons/md";
import { Link, useHistory } from "react-router-dom";

import "./Signin.css";
import Button from "../../Util/Button";
import InputField from "../../Util/InputField";
import {storeUserDetails, getUserDetails} from "../../Util/functions"

const Signin = () => {
    const [formDetails, setFormDetails] = useState({
        email: "",
        password: "",
    });
    const [checkBox, setCheckBox] = useState(false);
    const history = useHistory();

    useEffect(()=>{
        const details = getUserDetails();

        if(details){
            setFormDetails({...details});
        }
    },[]);

    const changeHandler = (e) => {
        setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();

        fetch('http://localhost:8080/user/signin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(formDetails),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data) {
                storeUserDetails(checkBox, formDetails);
                history.push("/");
            }
        })
        .catch(err => console.log(err))
    };

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
                onSubmit={submitHandler}
                >
                <InputField
                    label="Email"
                    auto_focus
                    properties={{
                    id: "email",
                    type: "email",
                    name: "email",
                    value: formDetails.email,
                    onChange: changeHandler,
                    className: formDetails.email ? "valid":"",
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
                    className: formDetails.password ? "valid":"",
                    }}
                />
                <div className="remember"> 
                    {
                        formDetails.email && formDetails.password ? <input type="checkbox" name="remember" id="remember" onChange={() => setCheckBox(!checkBox)} /> : <input type="checkbox" name="remember" id="remember" disabled />
                    }
                    <label htmlFor="remember">Remember me</label>
                </div>
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

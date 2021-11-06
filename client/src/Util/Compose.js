import React,{ useState } from 'react';

import './Compose.css';

const Compose = () => {
    const [formDetails, setFormDetails] = useState({
        to: '',
        subject: '',
        body: ''
    });

    const [error, setError] = useState({
        to: '',
        subject: '',
        body: ''
      });

    const changeHandler = (e) => {
        setError({ ...error, [e.target.name]: "" });
        setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
    };

    return (
        <div className="compose">
            <div className="compose_container">
                <div className="header">
                    <h2>Compose Mail</h2>
                </div>
                <div className="form">
                    <div className="input-group">
                        <input type="email" name="to" id="to" />
                        <label htmlFor="to">To</label>
                    </div>
                    <div className="input-group">
                        <input type="text" name="subject" id="subject" />
                        <label htmlFor="subject">Subject</label>
                    </div>
                    <div className="input-group">
                        <input type="text" name="body" id="body" />
                        <label htmlFor="body">Body</label>
                    </div>
                    <div className="button-group">
                        <span>Send</span>
                        <span>Cancel</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Compose

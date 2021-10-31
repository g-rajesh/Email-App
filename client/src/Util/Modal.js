import React from 'react';

function Modal() {
    return (
        <div className="error_modal">
            <div className="modal">
                <h2>WARNING</h2>
                <p>Password is either wrong</p>
                <p>or</p>
                <p>do the following</p>
                <p>myaccount.google.com &gt; security &gt; allow less secure apps</p>
                <div className="closeBtn">
                    <span>Close</span>
                </div>
            </div>
        </div>
    )
}

export default Modal

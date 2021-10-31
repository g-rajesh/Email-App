import React from "react";
import { useGlobalContext } from "../store/context";

function Modal({}) {
  const { showModalHandler } = useGlobalContext();

  return (
    <div className="error_modal ">
      <div className="modal">
        <h2>WARNING</h2>
        <p>Either password is wrong</p>
        <p>or</p>
        <p>Access denied (Do the following)</p>
        <p>myaccount.google.com -&gt; security -&gt; Allow less secure apps</p>
        <div className="closeBtn">
          <span>
            <a href="https://myaccount.google.com/security" target="_blank">
              Goto
            </a>
          </span>
          <span className="close" onClick={() => showModalHandler()}>
            Close
          </span>
        </div>
      </div>
    </div>
  );
}

export default Modal;

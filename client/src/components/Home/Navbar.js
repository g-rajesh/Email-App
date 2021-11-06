import React from "react";
import { MdEmail } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";

const Navbar = (props) => {
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  return (
    <nav className="navBar">
      <div className="logo">
        <MdEmail className="emailIcon" />
        <span>Mailer</span>
      </div>
      <div className="links">
        <ul className="nav-links">
          <li onClick={() => props.setShowCompose(true)}>
            <FaPlus className="plus-icon" />
            <span className="text">New</span>
          </li>
          <li onClick={logoutHandler}>
            <HiOutlineLogout className="logoutIcon" />
            <span className="text">Logout</span>
          </li>
        </ul>
        <span className="user">batmanae2@gmail.com</span>
      </div>
    </nav>
  );
};

export default Navbar;

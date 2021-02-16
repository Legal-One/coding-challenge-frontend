import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import "./Nav.css";

const Nav = () => {
  return (
    <div className="nav">
      <Link to="/">
        <img className="Logo" src={logo} alt="callog" />
      </Link>
    </div>
  );
};

export default Nav;

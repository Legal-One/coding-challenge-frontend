import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";
function Header() {
    return (
        <header>
            <Link to="/"><img src="https://legal.one/img/logo.svg" alt="company logo" /></Link>
        </header>
    );
}
export default Header;

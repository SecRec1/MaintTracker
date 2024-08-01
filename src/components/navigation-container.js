import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import styles from "../style/NavStyles.scss";
import Auth from "./pages/auth";

const NavigationComponent = (props) => {
  
  const handleSearchClick = () => {
    const event = new CustomEvent("openSearchModal");
    window.dispatchEvent(event);
  };
  

  return (
    <div className="nav-wrapper">
      <div className="nav-link-wrapper">
        <NavLink
          exact
          to="/scan"
          activeClassName="nav-link-active"
          className="scan"
        >
          <FontAwesomeIcon className="icon" icon="qrcode" /> SCAN
        </NavLink>
        <NavLink
          to="/Search"
          activeClassName="nav-link-active"
          className="search"
          onClick={handleSearchClick}
        >
          <FontAwesomeIcon className="icon" icon="binoculars" />
          Search
        </NavLink>
        <NavLink
          to="/Manager"
          activeClassName="nav-link-active"
          className="manager"
        >
          <FontAwesomeIcon className="icon" icon="list-check" />
          Manager
        </NavLink>
        <div className="main-login-wrapper">
          <Auth id="login" className="login " />
        </div>
      </div>
    </div>
  );
};

export default withRouter(NavigationComponent);
// function showHideLogin() {
//   var login = document.getElementById("login");
//   login.classList.toggle("show");
// }

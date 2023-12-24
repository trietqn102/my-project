import React from "react";
import './Nav.css';
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div className="topnav">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/Control">Control</NavLink>
      <NavLink to="/Sign-In">Sign-in</NavLink>
    </div>
  );
};

export default Nav;
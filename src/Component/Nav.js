import React from "react";
import './Nav.css';
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div className="topnav">
      <NavLink to="/my-project/">Home</NavLink>
      <NavLink to="/my-project/Control">Control</NavLink>
      <NavLink to="/my-project/Sign-In">Sign-in</NavLink>
    </div>
  );
};

export default Nav;
import { Navigate, NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import { useState } from "react";

function Header(props: { loggedIn: boolean }) {

  function logUserOut() {
    localStorage.removeItem('userId');
    localStorage.removeItem('authToken');
  }

  return (
    <header className={classes.header}>
      <span className={classes.logo}>
        Shipment
        <br /> Manager
      </span>

      {props.loggedIn && <button className={classes.button}><NavLink
              to="/login"
              onClick={() => {logUserOut()}}
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Logout
            </NavLink></button>}

      {!props.loggedIn && (
        <div className={classes.buttonwrapper}>
          <button className={classes.button} style={{'marginRight': '1rem'}}>
            <NavLink
              to="/login"
              className={({ isActive }) => isActive ? classes.active : undefined}
            >
              Login
            </NavLink>
          </button>
          <button className={classes.button}>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Register
            </NavLink>
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;

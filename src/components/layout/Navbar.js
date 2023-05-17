import React from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../logo.svg";

const Navbar = ({ isAuthenticated, setIsAuthenticated, setUser, loading }) => {
  const history = useHistory();

  const authLinks = (
    <ul className="navItems">
      <li>
        <Link to="/tasks">Tasks</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link
          onClick={() => {
            setIsAuthenticated(false);
            setUser({
              name: "",
              email: "",
            });
            history.push("/login");
            localStorage.removeItem("token");
          }}
          to="#"
        >
          Logout
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul className="navItems">
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <div className="navbar-container">
      <Link to="/">
        <span className="logoAndBrand">
          <img src={logo} className="App-logo" alt="logo" />
          <span className="brand">$.25,000 IDEA</span>
        </span>
      </Link>
      {/* The conditionals */}
      <>{isAuthenticated ? authLinks : guestLinks}</>
      {/* {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>} */}
    </div>
  );
};

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <h1>City Info Dashboard</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/buses">Buses</Link>
        <Link to="/parking">Parking</Link>
        <Link to="/trip">Trip Planner</Link>
      </nav>
    </header>
  );
};

export default Header;

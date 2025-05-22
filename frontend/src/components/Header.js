import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBus, FaParking, FaRoute, FaHome } from "react-icons/fa";

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <header className="header">
      <nav>
        <Link to="/" className="logo">
          CityTransit
        </Link>
        <div className="nav-links">
          <Link to="/" className={isActive("/")}>
            <FaHome /> Home
          </Link>
          <Link to="/buses" className={isActive("/buses")}>
            <FaBus /> Buses
          </Link>
          <Link to="/parking" className={isActive("/parking")}>
            <FaParking /> Parking
          </Link>
          <Link to="/trip" className={isActive("/trip")}>
            <FaRoute /> Trip Planner
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header
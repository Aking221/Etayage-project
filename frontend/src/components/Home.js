import React from "react";
import busImage from "../assets/bus.png";
import metroImage from "../assets/metro.png";
import cityImage from "../assets/city.png";

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to the City Info Dashboard</h1>
        <p>Find nearby buses, parking spaces, and plan your trips effortlessly.</p>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <img src={busImage} alt="Bus" />
          <h3>Buses</h3>
          <p>View real-time bus schedules and find the nearest stops.</p>
        </div>
        <div className="feature-card">
          <img src={metroImage} alt="parking" />
          <h3>Parking</h3>
          <p>Find the nearest Parking  and their schedules.</p>
        </div>
        <div className="feature-card">
          <img src={cityImage} alt="City" />
          <h3>City</h3>
          <p>Discover amenities and services around the city.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;

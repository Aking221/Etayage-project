import React from "react";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the City Info Dashboard</h1>
      <p>
        Use this dashboard to find nearby buses, parking spaces, and plan your trips in the city effortlessly.
      </p>
      <div className="features">
        <div className="feature-card">
          <h3>Buses</h3>
          <p>View real-time bus schedules and find the nearest stops.</p>
        </div>
        <div className="feature-card">
          <h3>Parking</h3>
          <p>Check available parking spots and their distances.</p>
        </div>
        <div className="feature-card">
          <h3>Trip Planner</h3>
          <p>Plan your trip with the best routes and nearest amenities.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

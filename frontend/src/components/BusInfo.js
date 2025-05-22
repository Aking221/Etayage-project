import React, { useState, useEffect } from "react";
import { fetchBusData } from "../utils/api";
import { FaBus, FaClock, FaMapMarkerAlt } from "react-icons/fa";

const BusInfo = () => {
  const [busData, setBusData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBusData();
        setBusData(data);
        setError("");
      } catch (err) {
        setError("Failed to fetch bus data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    // Refresh data every minute
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const filteredBusData = busData.filter(bus => 
    bus.stopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.lineName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading"></div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="info-container">
      <h2>Real-Time Bus Information</h2>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by stop name or line number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="info-grid">
        {filteredBusData.map((bus, index) => (
          <div key={index} className="info-card">
            <div className="info-header">
              <h3><FaBus /> Line {bus.lineName}</h3>
              <span className="status available">On Time</span>
            </div>
            <div className="info-content">
              <p>
                <FaMapMarkerAlt /> {bus.stopName}
              </p>
              <p>
                <FaClock /> Arrival: {new Date(bus.arrivalTime).toLocaleTimeString()}
              </p>
              {bus.distance && (
                <p>
                  <FaMapMarkerAlt /> Distance: {bus.distance.toFixed(2)} km
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
import React, { useState, useEffect } from "react";
import { fetchBusData } from "../utils/api";

const BusInfo = () => {
  const [busData, setBusData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bus-container">
      <h2>Bus Information</h2>
      <div className="bus-list">
        {busData.map((bus, index) => (
          <div key={index} className="bus-card">
            <p><strong>Stop Name:</strong> {bus.stopName || "Unknown"}</p>
            <p><strong>Line:</strong> {bus.lineName || "Unknown"}</p>
            <p><strong>Arrival Time:</strong> {bus.arrivalTime || "N/A"}</p>
            <p>
              <strong>Distance:</strong>{" "}
              {bus.distance !== undefined ? `${bus.distance.toFixed(2)} km` : "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusInfo;

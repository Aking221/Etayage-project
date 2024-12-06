import React, { useState, useEffect } from "react";
import { fetchParkingData } from "../utils/api";

const ParkingInfo = () => {
  const [parkingData, setParkingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchParkingData();
        setParkingData(data);
        setError("");
      } catch (err) {
        setError("Failed to fetch parking data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="parking-container">
      <h2>Parking Information</h2>
      <div className="parking-list">
        {parkingData.map((parking, index) => (
          <div key={index} className="parking-card">
            <p><strong>Parking Name:</strong> {parking.name || "Unknown"}</p>
            <p><strong>Available Spaces:</strong> {parking.availableSpaces || "N/A"}</p>
            <p><strong>Total Spaces:</strong> {parking.totalSpaces || "N/A"}</p>
            <p>
              <strong>Distance:</strong>{" "}
              {parking.distance !== undefined ? `${parking.distance.toFixed(2)} km` : "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParkingInfo;

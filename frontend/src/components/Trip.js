import React, { useState, useEffect } from "react";
import { fetchTripPlan, fetchStops } from "../utils/api";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Ensure Leaflet CSS is imported

const ResizeAwareMap = ({ userPosition, nearestBus, nearestParking }) => {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize(); // Adjust map size when the component loads
  }, [map]);

  return (
    <>
      {nearestBus && (
        <Marker position={nearestBus.coordinates}>
          <Popup>
            <strong>{nearestBus.stopName || "Unknown Stop"}</strong>
            <p>Line: {nearestBus.lineName || "N/A"}</p>
          </Popup>
        </Marker>
      )}
      {nearestParking && (
        <Marker position={nearestParking.coordinates}>
          <Popup>
            <strong>{nearestParking.name || "Unknown Parking"}</strong>
          </Popup>
        </Marker>
      )}
    </>
  );
};

const Trip = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [selectedStop, setSelectedStop] = useState("");
  const [stops, setStops] = useState([]);
  const [nearestBus, setNearestBus] = useState(null);
  const [nearestParking, setNearestParking] = useState(null);
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserPosition({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => {
        console.error("Geolocation error:", err);
        setError("Unable to fetch your location. Please enable location access.");
      }
    );
  }, []);

  useEffect(() => {
    const getStops = async () => {
      try {
        const data = await fetchStops();
        setStops(data);
      } catch (err) {
        console.error("Failed to fetch stops:", err);
        setError("Failed to load stops. Please refresh the page.");
      }
    };
    getStops();
  }, []);

  const handleSubmit = async () => {
    if (!userPosition || !selectedStop) {
      setError("Please enable location access and select a stop.");
      return;
    }
    setLoading(true);
    setError(null);
    setTripData(null);
    setNearestBus(null);
    setNearestParking(null);

    try {
      const selectedStopCoordinates = stops.find(
        (stop) => stop.stopName === selectedStop
      )?.coordinates;
      if (!selectedStopCoordinates) {
        setError("Selected stop has no coordinates.");
        setLoading(false);
        return;
      }

      const data = await fetchTripPlan(userPosition.lat, userPosition.lon, selectedStop);
      setTripData(data);

      const closestBus = data.buses.reduce((closest, current) =>
        current.distance < closest.distance ? current : closest
      );
      const closestParking = data.parkings.reduce((closest, current) =>
        current.distance < closest.distance ? current : closest
      );

      setNearestBus(closestBus);
      setNearestParking(closestParking);
    } catch (err) {
      setError("Failed to plan trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="trip-container">
      <h2>Plan Your Trip</h2>
      <div className="trip-form">
        <select value={selectedStop} onChange={(e) => setSelectedStop(e.target.value)}>
          <option value="">Select a Stop</option>
          {stops.map((stop, index) => (
            <option key={index} value={stop.stopName}>
              {stop.stopName}
            </option>
          ))}
        </select>
        <button onClick={handleSubmit} disabled={!selectedStop || !userPosition}>
          Plan Trip
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {tripData && userPosition && (
        <div className="trip-results">
          <h3>Nearest Bus</h3>
          {nearestBus ? (
            <div className="bus-card">
              <p><strong>Stop Name:</strong> {nearestBus.stopName}</p>
              <p><strong>Line:</strong> {nearestBus.lineName}</p>
              <p><strong>Arrival Time:</strong> {new Date(nearestBus.arrivalTime).toLocaleTimeString()}</p>
              <p><strong>Distance:</strong> {nearestBus.distance.toFixed(2)} km</p>
            </div>
          ) : (
            <p>No nearby buses found.</p>
          )}

          <h3>Nearest Parking</h3>
          {nearestParking ? (
            <div className="parking-card">
              <p><strong>Parking Name:</strong> {nearestParking.name}</p>
              <p><strong>Available Spaces:</strong> {nearestParking.availableSpaces}</p>
              <p><strong>Total Spaces:</strong> {nearestParking.totalSpaces}</p>
              <p><strong>Distance:</strong> {nearestParking.distance.toFixed(2)} km</p>
            </div>
          ) : (
            <p>No nearby parking found.</p>
          )}

          <div className="map">
            <MapContainer
              center={[userPosition.lat, userPosition.lon]}
              zoom={14}
              style={{ height: "400px", width: "100%", marginTop: "20px" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <ResizeAwareMap
                userPosition={userPosition}
                nearestBus={nearestBus}
                nearestParking={nearestParking}
              />
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trip;

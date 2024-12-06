import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

// Fetch buses
export const fetchBusData = async () => {
  const response = await axios.get(`${BASE_URL}/api/bus`);
  return response.data;
};

// Fetch parking data
export const fetchParkingData = async () => {
  const response = await axios.get(`${BASE_URL}/api/parking`);
  return response.data;
};

// Fetch trip plan
export const fetchTripPlan = async (userLat, userLon, destination) => {
  const response = await axios.get(`${BASE_URL}/api/trip`, {
    params: { userLat, userLon, destination },
  });
  return response.data;
};

// Fetch stops
export const fetchStops = async () => {
  const response = await axios.get(`${BASE_URL}/api/stops`);
  return response.data;
};

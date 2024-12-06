import fetchData from "../utils/fetchData.js";
import { calculateDistance } from "../utils/mapUtils.js";

export const planTrip = async (req, res, next) => {
  try {
    const { userLat, userLon, destination } = req.query;

    // Validate query parameters
    if (!userLat || !userLon || !destination) {
      return res.status(400).json({ error: "Missing required parameters: userLat, userLon, or destination" });
    }

    // Fetch destination coordinates using OpenStreetMap API
    const geocodeAPI = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(destination)}&format=json`;
    const destinationData = await fetchData(geocodeAPI);

    if (!destinationData.length) {
      return res.status(404).json({ error: "Destination not found" });
    }

    const destinationCoords = {
      lat: parseFloat(destinationData[0].lat),
      lon: parseFloat(destinationData[0].lon),
    };

    // Fetch bus data
    const busAPI = "https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=prochains-passages-des-lignes-de-bus-du-reseau-star-en-temps-reel&rows=10";
    const busData = await fetchData(busAPI);

    // Fetch parking data
    const parkingAPI = "https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=export-api-parking-citedia&rows=10";
    const parkingData = await fetchData(parkingAPI);

    // Map bus data
    const buses = busData.records.map(record => ({
      stopName: record.fields.nomarret || "Unknown", // Stop name
      lineName: record.fields.nomcourtligne, // Line name
      arrivalTime: record.fields.arrivee, // Arrival time
      coordinates: record.fields.coordonnees, // Coordinates
      distance: calculateDistance(
        userLat,
        userLon,
        record.fields.coordonnees[0],
        record.fields.coordonnees[1]
      ),
    }));

    // Map parking data
    const parkings = parkingData.records.map(record => ({
      name: record.fields.key || "Unknown Parking", // Parking name
      availableSpaces: record.fields.free || 0, // Available spaces
      totalSpaces: record.fields.max || 0, // Total spaces
      coordinates: record.fields.geo, // Coordinates
      distance: calculateDistance(
        userLat,
        userLon,
        record.fields.geo[0],
        record.fields.geo[1]
      ),
    }));

    // Sort buses and parking spots by distance
    const sortedBuses = buses.sort((a, b) => a.distance - b.distance);
    const sortedParkings = parkings.sort((a, b) => a.distance - b.distance);

    // Return response
    res.status(200).json({
      destination: destinationCoords,
      buses: sortedBuses,
      parkings: sortedParkings,
    });
  } catch (error) {
    console.error("Error in planTrip:", error);
    next(error);
  }
};

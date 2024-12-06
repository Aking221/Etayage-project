import fetchData from "../utils/fetchData.js";

export const getParkingData = async (req, res, next) => {
  try {
    const parkingAPI =
      "https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=export-api-parking-citedia";
    const data = await fetchData(parkingAPI);

    
    const parkings = data.records.map((record) => ({
      name: record.fields.key, 
      availableSpaces: record.fields.free,
      totalSpaces: record.fields.max,
      coordinates: record.geometry.coordinates,
      status: record.fields.status,
    }));

    res.status(200).json(parkings);
  } catch (error) {
    next(error);
  }
};

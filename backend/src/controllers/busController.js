import fetchData from "../utils/fetchData.js";

export const getBusData = async (req, res, next) => {
  try {
    const busAPI = "https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=prochains-passages-des-lignes-de-bus-du-reseau-star-en-temps-reel";
    const data = await fetchData(busAPI);
    res.status(200).json(data.records.map(record => ({
      stopName: record.fields.nom_arret,
      lineName: record.fields.nomcourtligne,
      arrivalTime: record.fields.arrivee,
      coordinates: record.fields.coordonnees,
    })));
  } catch (error) {
    next(error);
  }
};

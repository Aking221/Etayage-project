import fetchData from "../utils/fetchData.js";

export const getStops = async (req, res, next) => {
    try {
        const busAPI = "https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=prochains-passages-des-lignes-de-bus-du-reseau-star-en-temps-reel";
        const data = await fetchData(busAPI);

        // Extraire les arrêts et leurs coordonnées
        const stops = data.records
    .filter(record => record.fields.nomarret && record.fields.coordonnees) // Vérifie que les champs existent
    .map(record => ({
        stopName: record.fields.nomarret,
        coordinates: record.fields.coordonnees,
    }));

        // Supprimer les doublons (par nom d'arrêt)
        const uniqueStops = [...new Map(stops.map(item => [item.stopName, item])).values()];

        res.status(200).json(uniqueStops);
    } catch (error) {
        next(error);
    }
};

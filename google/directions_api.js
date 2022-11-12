const env = require("dotenv").config();

const {
    Client,
    Language,
    TravelMode,
} = require("@googlemaps/google-maps-services-js");
const client = new Client({});

exports.calculateRoute = async (data) => {
const start = data.shift();
const end = data.pop();
const midpoints = data.map((e) => e.position);
return await client
    .directions({
    params: {
        origin: start.position,
        destination: end.position,
        mode: TravelMode.walking,
        language: Language.en,
        departure_time: "now",
        waypoints: midpoints,
        key: process.env.API_KEY ? process.env.API_KEY : "",
    },
    timeout: 1000, // milliseconds
    })
    .catch(error => console.log(error));
};
const auth = require("./authentication");
const placeAPI = require("./Google/place_api");
const axios = require("axios");

const result = placeAPI.googleMap_placeSearch_api("東京駅");
// const placeInfo = placeAPI.googleMap_placeDetail_api();

console.log(result);


const placeAPI = require("./Google/place_api");
const path  = require('path');
const env = require('dotenv').config();
if (env.error) {
    logger.error("failed to load env file");
}

const main = async () => {
    const result =  await placeAPI.googleMap_placeSearch_api("東京駅");
    console.log(result);
}

main();
// const placeInfo = placeAPI.googleMap_placeDetail_api();
// console.log(result);


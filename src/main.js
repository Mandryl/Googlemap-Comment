const placeAPI = require("./Google/place_api");
const env = require('dotenv').config();

if (env.error) {
    console.log("failed to load env file");
}

const main = async () => {
    const {arry, photos,lat,lng} = await placeAPI.createLandmarkInfo("八王子駅");
    const nearby = await placeAPI.createNearbyLandmarkInfo(lat,lng);
    console.log(nearby);
    console.log(arry);
}

main();

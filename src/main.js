const placeAPI = require("./Google/place_api");
const env = require('dotenv').config();

if (env.error) {
    console.log("failed to load env file");
}

const main = async () => {
    const {arry, photos,lat,lng} = await placeAPI.createLandmarkInfo("京王八王子駅");
    const nearby = await placeAPI.createNearbyLandmarkInfo(lat,lng);
    console.log(arry);
    console.log(photos);
    console.log(nearby);
}

main();

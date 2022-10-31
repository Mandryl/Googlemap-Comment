const placeAPI = require("./Google/place_api");
const env = require('dotenv').config();

if (env.error) {
    console.log("failed to load env file");
}

const main = async () => {
    const {arry, photos} = await placeAPI.createLandmarkInfo()
    console.log(photos);
    console.log(arry);
}

main();

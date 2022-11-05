const placeAPI = require("./Google/place_api");
const env = require('dotenv').config();

if (env.error) {
    console.log("failed to load env file");
}

const main = async () => {
    const {arry, photos,lat,lng} = await placeAPI.createLandmarkInfo("東京都八王子市明神町３丁目２７");
    const nearby = await placeAPI.createNearbyLandmarkInfo(lat,lng);

    if(arry.reviewComment.includes(null) || photos.photo.includes(null)) throw new Error("口コミ、または写真がありません");

    console.log(arry);
    console.log(photos);
    console.log(nearby);
}

main();

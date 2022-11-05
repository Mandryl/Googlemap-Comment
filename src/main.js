const placeAPI = require("./Google/place_api");
const env = require('dotenv').config();

if (env.error) {
    console.log("failed to load env file");
}

const main = async () => {
    const {arry, photos,lat,lng} = await placeAPI.createLandmarkInfo("東京駅");
    const nearby = await placeAPI.createNearbyLandmarkInfo(lat,lng);

    arry.forEach(input => {
        if(input.reviewComment == null) throw new Error("口コミ、または写真がありません");
    })

    photos.forEach(input => {
        if(input.photo == null) throw new Error("口コミ、または写真がありません");
    })

    console.log(arry);
    console.log(photos);
    console.log(nearby);
}

main();
// 35.6578931, 139.3429495
// 35.68123620000001, 139.7671248
// 東京都八王子市明神町３丁目２７
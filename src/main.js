const placeAPI = require("./Google/place_api");
const env = require('dotenv').config();

if (env.error) {
    console.log("failed to load env file");
}

const main = async () => {
    const {arry, photos,lat,lng} = await placeAPI.createLandmarkInfo("東京駅");
    const nearby = await placeAPI.createNearbyLandmarkInfo(lat,lng);

    arry.forEach(input => {
        if(input.reviewComment == null) throw new Error("口コミがありません");
    })

    photos.forEach(input => {
        if(input.photo == null) throw new Error("写真がありません");
    })

    console.log(arry);
    console.log(photos);
    console.log(nearby);
}

main();

const placeAPI = require("./Google/place_api");
const env = require('dotenv').config();
const fs = require('fs');
if (env.error) {
    console.log("failed to load env file");
}

const main = async () => {
    const placeSearch =  await placeAPI.googleMap_placeSearch_api("東京駅");
    const placeDetail =  await placeAPI.googleMap_placeDetail_api(placeSearch.candidates[0].place_id);
    const placePhoto =  await placeAPI.googleMap_placePhoto_api(placeDetail.result.photos[0].photo_reference);
    fs.writeFileSync('./hog1.png', placePhoto);
    // console.log(placeDetail.result.photos[0].photo_reference);
    const decode = await new Buffer.from(placePhoto,'base64');
    fs.writeFile('hoge.png', decode, (err) => {
        if(err){
            console.log(err)
        }else{
            console.log('saved');
        }
    });
    
    
}

main();
// const placeInfo = placeAPI.googleMap_placeDetail_api();
// console.log(result);


const placeAPI = require("./Google/place_api");
const env = require('dotenv').config();
const fs = require('fs');
const Encoding = require('encoding-japanese');
const jetpack = require("fs-jetpack");
const request = require('request')

if (env.error) {
    console.log("failed to load env file");
}

const main = async () => {
    const placeSearch =  await placeAPI.googleMap_placeSearch_api("東京駅");
    const placeDetail =  await placeAPI.googleMap_placeDetail_api(placeSearch.candidates[0].place_id);
    const placePhoto =  await placeAPI.googleMap_placePhoto_api(placeDetail.result.photos[0].photo_reference);
    
    const extensions = placePhoto.headers['content-type'].toString().replace("image/","");

    // 二つの方法で出力が可能
    fs.writeFileSync(`hoge.${extensions}`,placePhoto.data , "base64"); 
    
    let url = placePhoto.request.res.responseUrl;
    request({ url, encoding: null }, (err, resp, buffer) => {
        fs.writeFile("request.jpeg", buffer, function (err) {
        console.log(err); // writes out file without error, but it's not a valid image
        });
    });  
    
}

main();


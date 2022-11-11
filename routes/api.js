const express = require("express");
const logger = require("../common/logger.js");
const router = express.Router();
const db = require("../db/db.js");
const tokyo =  require("../db/initialData/tokyo.json");
const google  = require("../google/place_api.js");

router.get('/api/quiz/:id', async (req, res) => {
    const quizdataset = await db.findFrom("quiz",{"field.id":req.params.id})
        .catch(error=>{res.status(500).json({message:error})});
    const quizreview = await db.findFrom("quiz",{"field.id":req.params.id})
        .catch(error=>{res.status(500).json({message:error})});
    if(quizdataset){
        if(quizreview){
            const {arry, photos,lat,lng} = await placeAPI.createLandmarkInfo("八王子駅");
            const nearby = await placeAPI.createNearbyLandmarkInfo(lat,lng);
        }
        res.status(200).json(quizdataset);
    }else{
        res.status(200).json("{error}");
    }
});
module.exports = router;

const placeAPI = require("../google/place_api");
const env = require('dotenv').config();

if (env.error) {
    console.log("failed to load env file");
}

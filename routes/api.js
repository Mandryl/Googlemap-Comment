const express = require("express");
const logger = require("../common/logger.js");
const router = express.Router();
const db = require("../db/db.js");
const placeAPI  = require("../google/place_api.js");
const directionsAPI = require("../google/directions_api.js")

const compare = ( a, b )=>{
    var r = 0;
    if( a.id < b.id ){ r = -1; }
    else if( a.age > b.age ){ r = 1; }
    return r;
}

router.get('/api/quiz/:id', async (req, res) => {
    // DB受け取り
    const spots = await db.findFrom("tokyo",{"area":req.params.id})
        .catch(error=>{res.status(500).json({message:error})});
    spots.sort(compare)

    // Google API Detailの取得
    if(spots){
        for(let i =0;i < spots.length;i++){
            let hintsArry = {
                photos:[],
                reviews:""
            };
            // hints get
            // const {arry, photos,latlng} = await placeAPI.createLandmarkInfo(spots[i].name);
            const {arry, photos} = await placeAPI.createLandmarkInfo(spots[i].name);
            arry.forEach(input => {
                if(input.reviewComment === null) throw new Error("口コミがありません");
            })
            photos.forEach(input => {
                if(input.photo === null) throw new Error("写真がありません");
            })

            // hints push
            hintsArry["photos"] = photos;
            hintsArry["reviews"] = arry;
            spots[i]["hints"] = hintsArry;
        }
        const route = await directionsAPI.calculateRoute(spots);
        const quizdataset = { 
            spots: spots,
            routes: route.data
        }
        console.log(quizdataset)
        // quizdataset.push["spots"] = spots;
        // quizdataset["route"] = route;
        res.status(200).json(quizdataset);
    }else{
        res.status(200).json("{error}");
    }
});

module.exports = router;
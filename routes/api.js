const express = require("express");
const logger = require("../common/logger.js");
const router = express.Router();
const db = require("../db/db.js");
const tokyo =  require("../db/initialData/tokyo.json")

router.get('/api/quiz/:id', async (req, res) => {
    // const transactions = await db.findFrom("transaction",{"field.id":req.params.fieldID})
    //     .catch(error=>{res.status(500).json({message:error})});
    if(req.params.id==tokyo){
        res.status(200).json(tokyo);
    }
    // if(transactions) {
    //     res.status(200).json(tokyo);
    // }else{
    //    console.log("OK")
    // }
});
module.exports = router;
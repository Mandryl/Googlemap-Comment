const express = require("express");
const placeAPI = require("./google/place_api");
const apiRoutes = require('./routes/api.js');
const db = require("./db/db");
const logger = require("./common/logger.js");
const app = express();
const env = require('dotenv').config();
if (env.error) {
  console.log("failed to load env file");
}

db.init().then(()=>{
  logger.info("DB init complete");
});


app.use('/', apiRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`listening on ${port}`);
});
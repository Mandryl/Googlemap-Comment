const express = require("express");
const placeAPI = require("./src/Google/place_api");
const env = require('dotenv').config();
const apiRoutes = require('./routes/api.js');
const db = require("./db/db");
const logger = require("./common/logger.js");
const app = express();

app.use('/', apiRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`listening on ${port}`);
});
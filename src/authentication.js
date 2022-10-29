const env = require('dotenv').config();
const path  = require('path');
const currentDir = process.cwd();
const ENV_PATH = path.join(currentDir, '../.env');
// dotenv.config({ path: ENV_PATH })

exports.get_googleMaps_env = () => {
    console.log(path.join(currentDir, '../.env'));
    return {
        api_key: process.env.API_KEY
    }
}
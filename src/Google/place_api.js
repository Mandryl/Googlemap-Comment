const axios = require("axios");
const auth = require("./../authentication");

exports.googleMap_placeSearch_api = async(landmark) => {
    const api_key = auth.get_googleMaps_env().api_key;
    const placeSearch = {
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=place_id%2Crating',
        params: {
            input: landmark,
            inputtype: "textquery",
            key: api_key
        },
        headers: { }
    };
    const response = await axios(placeSearch);
    return response.data;
}

exports.googleMap_placeDetail_api = () => {
    const placeDetail = {
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&fields=name%2Crating%2Cformatted_phone_number&key=AIzaSyCPOk9HBGQZr8FXMO9Rp5y7QEvXWBIORzg',
        headers: { }
    };
    
    axios(placeDetail)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        return response.data
    })
    .catch(function (error) {
        console.log(error);
    });
}

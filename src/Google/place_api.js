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

exports.googleMap_placeDetail_api = async(placeid) => {
    const api_key = auth.get_googleMaps_env().api_key;
    const placeDetail = {
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Crating%2Cwebsite%2Creviews%2Cphoto',
        params: {
            place_id:placeid,
            key: api_key,
            reviews_sort:'most_relevant',
            language:'ja'
        },
        headers: { }
    };
    
    const response = await axios(placeDetail);
    return response.data;
}

exports.googleMap_placePhoto_api = async(photoreference) => {
    const api_key = auth.get_googleMaps_env().api_key;
    const placePhoto = {
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/place/photo',
        params: {
            maxwidth:400,
            photo_reference:photoreference,
            key: api_key,
        },  
        headers: {
          'Content-Type': 'image/png'
        },
        responseType: 'arraybuffer',
    };
    
    const response = await axios(placePhoto);
    return response;
}


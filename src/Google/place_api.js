const axios = require("axios");
const auth = require("./../authentication");

exports.googleMap_placeSearch_api = (landmark) => {
    console.log(auth.get_googleMaps_env);
    const placeSearch = {
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json',
        params: {
            input: landmark,
            inputtype: "textquery",
            fields: "place_id,reviews,rating",
            key: auth.get_googleMaps_env
        },
        headers: { }
    };
    
    // axios(placeSearch)
    // .then(function (response) {
    //     console.log(JSON.stringify(response.data));
    //     return response.data
    // })
    // .catch(function (error) {
    //     console.log(error);
    // });
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

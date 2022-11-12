const axios = require("axios");
const auth = require("../common/authentication");
 
exports.createNearbyLandmarkInfo = async (lat, lng) => {
    const arry = []
    const photos = []
    // nearbySearchAPI Call
    const nearbySearch = await googleMap_nearbySearch_api(lat, lng)
    nearbySearch.data.results.shift()
    nearbySearch.data.results.pop()    
    // 周辺情報のJSON[0]は東京、JSON[19]は千代田区（東京駅の場合）になるため削除
 
    for(let i = 0;i < 3;i++){
        arry.push(nearbySearch.data.results[i].name);
    }

    return arry;
}

exports.createLandmarkInfo = async (input) => {
    const arry = []
    const photos = []
    const placeSearch = await googleMap_placeSearch_api(input);

    for(let i = 0; i < placeSearch.candidates.length; i++){
        const placeDetail = await googleMap_placeDetail_api(placeSearch.candidates[i].place_id);

        for(let j = 0; j < 3; j++){
            if(!placeDetail.result.reviews){
                arry.push(null)
                console.log("口コミがありません");
            } else{
                arry.push(placeDetail.result.reviews[j].text)
            }
        }
        for(let k = 0; k < 5; k++){
            if(!placeDetail.result.photos){
                photos.push(null)
            } else {
                const placePhoto = await googleMap_placePhoto_api(placeDetail.result.photos[k].photo_reference);
                photos.push(placePhoto.request.res.responseUrl)
            }
        }
    }
    return {arry, photos}
}

googleMap_placeSearch_api = async(landmark) => {
    const api_key = auth.get_googleMaps_env().api_key;
    const placeSearch = {
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json',
        params: {
            input: landmark,
            inputtype: "textquery",
            fields: `place_id,rating,geometry,formatted_address`,
            key: api_key
        },
        headers: {}
    };
    const response = await axios(placeSearch);
    return response.data;
}

googleMap_placeDetail_api = async(placeid) => {
    const api_key = auth.get_googleMaps_env().api_key;
    const placeDetail = {
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/place/details/json',
        params: {
            place_id: placeid,
            fields: `name,rating,website,reviews,photo`,
            reviews_sort: 'most_relevant',
            language: 'en',
            key: api_key,
        },
        headers: {}
    };
    
    const response = await axios(placeDetail);
    return response.data;
}

googleMap_placePhoto_api = async(photoreference) => {
    const api_key = auth.get_googleMaps_env().api_key;
    const placePhoto = {
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/place/photo',
        params: {
            maxwidth: 400,
            photo_reference: photoreference,
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

googleMap_nearbySearch_api = async(lat, lng) => {
    const api_key = auth.get_googleMaps_env().api_key;
    const nearbySearch = {
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
        params: {
            location: `${lat},${lng}`,
            radius:50,
            language: "en",
            key: api_key
        },
        headers: {}
    };
    const response = await axios(nearbySearch);
    return response;
}

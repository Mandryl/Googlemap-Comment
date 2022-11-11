const axios = require("axios");
const auth = require("./../authentication");

exports.createNearbyLandmarkInfo = async (lat, lng) => {
    const arry = []
    const photos = []

    // nearbySearchAPI Call
    const nearbySearch = await googleMap_nearbySearch_api(lat, lng)
    const nearbySearch_data = nearbySearch.data;
    const nearbySearch_name = nearbySearch_data['results'];
    nearbySearch_name.forEach(input => {
        // 1行目のデータを取る
    })

    // placeSearch_api
    const placeSearch = await googleMap_placeSearch_api(`{友永さん}`);
    for(let i = 0; i < placeSearch.candidates.length; i++){
        const placeDetail = await googleMap_placeDetail_api(placeSearch.candidates[i].place_id);
        for(let j = 0; j < placeDetail.result.reviews.length; j++){
            arry.push({
                reviewComment: placeDetail.result.reviews[j].text
            })
        }
        // 近隣の口コミ情報＋写真が欲しい場合は以下のスクリプトを使う
        // for(let k = 0; k < placeDetail.result.photos.length; k++){
        //     const placePhoto = await googleMap_placePhoto_api(placeDetail.result.photos[k].photo_reference);
        //     photos.push({
        //         photo: placePhoto.data
        //     })
        //     // const extensions = placePhoto.headers['content-type'].toString().replace("image/","");
        //     // fs.writeFileSync(`hoge${k}.${extensions}`,placePhoto.data , "base64");
        // }
    }
    return {arry, photos}
}

exports.createLandmarkInfo = async (input) => {
    const arry = []
    const photos = []
    const latlng = []
    const placeSearch = await googleMap_placeSearch_api(input);
    console.log(placeSearch);

    for(let i = 0; i < placeSearch.candidates.length; i++){
        const placeDetail = await googleMap_placeDetail_api(placeSearch.candidates[i].place_id);

        const lat = placeSearch.candidates[i].geometry.location.lat
        const lng = placeSearch.candidates[i].geometry.location.lng

        for(let j = 0; j < placeDetail.result.reviews.length; j++){
            arry.push({
                reviewComment: placeDetail.result.reviews[j].text
            })
        }
        for(let k = 0; k < placeDetail.result.photos.length; k++){
            const placePhoto = await googleMap_placePhoto_api(placeDetail.result.photos[k].photo_reference);
            photos.push({
                photo: placePhoto.data
            })
            // const extensions = placePhoto.headers['content-type'].toString().replace("image/","");
            // fs.writeFileSync(`hoge${k}.${extensions}`,placePhoto.data , "base64");
        }
    }
    return {arry, photos,lat,lng}
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
            radius:100,
            language: "ja",
            key: api_key
        },
        headers: {}
    };
    const response = await axios(nearbySearch);
    return response;
}
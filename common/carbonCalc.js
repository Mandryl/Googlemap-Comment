const gmap = require("./gmap.js");
const {getDistance} = require('geolib');
const logger = require("./logger.js");

// These data and formulas are taken from Japanese government document.
// https://www.mlit.go.jp/pri/shiryou/press/pdf/shiryou110530_1-2.pdf
const Track_CONST = 135;
const FLIGHT_CONST = 903;

// These data are taken from Spanish National Research Council document.
// http://www.lessco2.es/pdfs/noticias/ponencia_cisc_ingles.pdf
const CROP_CONST = {
    Rice:0.34,
    Wheat:0.43,
    Soy:0.44,
    Tea:125,
    Coffee:100,
    Tomato:0.46,
    Cabbage:0.11
}

calcTrackCarbon = (kg,km)=>{
    return Track_CONST*km*kg/1000;
}

calcFlightCarbon = (kg,km)=>{
    return FLIGHT_CONST*km*kg/1000;
}

getCropAbsorb = (crop,kg,age) => {
    return 1000*kg*CROP_CONST[crop]*((1.022)**age - 1)
}

module.exports.calcCarbon = async (crop,age,from,to,kg) => {
    if(CROP_CONST[crop]){
        const absorb = getCropAbsorb(crop,kg,age);
        const result = await gmap.getGMapDistance(from,to);
        let penalty;
        if(result.status === "OK"){
            const distance = result.distance.value / 1000;
            penalty = (distance >= 2500) ? calcTrackCarbon(kg,distance) : 0;
        }else if(result.status === "ZERO_RESULTS"){
            const distance = getDistance(
                {latitude:from.lat, longitude: from.lng},
                {latitude:to.lat, longitude:to.lng}
            );
            penalty = calcFlightCarbon(kg,distance);
        }
        return {absorb:absorb,penalty:penalty};
    }else{
        return {absorb:-1,penalty:10000};
    }
}
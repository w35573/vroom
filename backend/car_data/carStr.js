const fetch = require('node-fetch');

async function getData(startDate, endDate, long, lat, location) {
    const URL = `https://admin.revv.co.in/api/v2/carInfo/startDate=${startDate}&endDate=${endDate}&longitude1=${long}&latitude1=${lat}&longitude2=${long}&latitude2=${lat}&carInfoID=0&bookingId=0?deviceType=website&customerID=null&pickupLocation=${location}`;

    try {
        const response = await fetch(URL);
        const data = await response.json();

        return data.data;
    } catch (e) {
        console.log(e);
    }
}

exports.getData = getData;
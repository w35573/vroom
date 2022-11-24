const puppeteer = require('puppeteer');

async function getData(city, min, max, availability, fuel, transmission, brand, sort, segment, limit, pagination) {
    try {
        const URL = `https://www.revv.co.in/open/${city}/stock/cars_pricing`;

        const cityOptions = ["bangalore", "hyderabad", "chennai", "mumbai", "delhi-ncr", "pune", "kolkata", "ahmedabad", "bhubaneswar", "chandigarh", "coimbatore", "jaipur", "kochi", "mangalore", "mysore", "nagpur", "tirupati", "trivandrum", "vijayawada", "vizag"];

        const priceOptions = [10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000];

        const availabilityOptions = [3, 7, 15, 30];

        const fuelOptions = ["petrol", "diesel"];

        const transmissionOptions = ["manual", "automatic"];

        const brandOptions = ["maruti", "hyundai", "mahindra", "honda", "ford", "tata", "nissan", "toyota"];

        const segmentOptions = ["hatch", "sedan", "suv"];

        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        const result = [];
        await page.setViewport({ width: 1200, height: 800 });
        await page.setRequestInterception(true);

        page.on('request', (request) => {
            // console.log(request.url());
            request.continue()
        })

        page.on('response', async (response) => {
            try {
                if (response.url() == "https://admin.revv.co.in/api/v1/lt/car/pricing/get") {
                    const data = await response.json();
                    // console.log(data);
                    result.push(data);
                }
            } catch (e) {
                console.log(e);
            }
        });

        await page.goto(URL, { waitUntil: 'networkidle0' });

        await browser.close();

        // console.log(result);

        const rawData = result[0];

        // if (result[0] === 'undefined') {
        //     rawData = result[1];
        // }

        let result1 = rawData.responseResult.filter(
            (car) => car.discountedPrice >= min && car.discountedPrice <= max && checkAvailability(car.availableFrom, availability)
        )

        let result2 = result1;
        if (segment != 'all') {
            result2 = result1.filter(
                (car) => segment.split(',').includes(car.carType.toLowerCase())
            );
        }

        let result3 = result2;
        if (fuel != 'all') {
            result3 = result2.filter(
                (car) => fuel.split(',').includes(car.fuelType.toLowerCase())
            );
        }

        let result4 = result3;
        if (transmission != 'all') {
            result4 = result3.filter(
                (car) => transmission.split(',').includes(car.transmission.toLowerCase())
            );
        }

        let result5 = result4;
        if (brand != 'all') {
            result5 = result4.filter(
                (car) => brand.split(',').includes(car.producer.toLowerCase())
            );
        }

        //sort query
        if (sort == 'asc') {
            result5.sort(sortByPropertyAsc('discountedPrice'));
        } else {
            result5.sort(sortByPropertyDesc('discountedPrice'));
        }

        const finalResult = result5.slice(pagination * limit, (pagination * limit) + limit);

        // console.log(result1.length, result2.length, result3.length, result4.length, result5.length);

        return {
            "error": false,
            "total": result5.length,
            "cities": cityOptions,
            "prices": priceOptions,
            "availabilities": availabilityOptions,
            "fuels": fuelOptions,
            "transmissions": transmissionOptions,
            "brands": brandOptions,
            "segments": segmentOptions,
            "page": pagination + 1,
            "limit": limit,
            "dataItems": finalResult.length,
            "data": finalResult
        }

    } catch (error) {
        console.log(error);
    }
}

function checkAvailability(availableFrom, availability) {
    const date1 = Date.now();
    const date2 = new Date(availableFrom);

    const difference = date2.getTime() - date1;

    const daysDifference = Math.round(difference / (1000 * 3600 * 24));

    return daysDifference <= availability;
}


//function to sort data in ascending order
function sortByPropertyAsc(property) {
    return function (a, b) {
        if (a[property] > b[property])
            return 1;
        else if (a[property] < b[property])
            return -1;

        return 0;
    }
}

//function to sort data in descending order
function sortByPropertyDesc(property) {
    return function (a, b) {
        if (a[property] > b[property])
            return -1;
        else if (a[property] < b[property])
            return 1;

        return 0;
    }
}


exports.getData = getData;

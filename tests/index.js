const puppeteer = require('puppeteer');

async function bookTicket() {
    try {

        // await login();

        /* user should be logged in, in order to checkout */

        const browser = await puppeteer.launch({
            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--start-maximized'],
            defaultViewport: null
        });

        const page1 = await browser.newPage();
        // await page1.setViewport({ width: 1366, height: 768 });

        await page1.goto('http://localhost:3000/login');

        await page1.focus('#email');
        await page1.keyboard.type('redijprathamesh833@gmail.com');
        await page1.focus('#password');
        await page1.keyboard.type('Tpp#5124');

        await page1.click('#login-btn');

        /* Go to home and fill the form for short term bookings */

        const page2 = await browser.newPage();
        // await page2.setViewport({ width: 1366, height: 768 });

        await page2.goto('http://localhost:3000/home');

        //location
        await page2.select('#location', 'mumbai');
        //start date
        await page2.focus('#start-date');
        await page2.keyboard.type('01-12-2022');
        //use defaults for start time
        //end date
        await page2.focus('#end-date');
        await page2.keyboard.type('02-12-2022');
        //use defaults for end time

        // submit
        await page2.click('#book-btn');

        /* Select a car and click on rent */

        await page2.waitForSelector('#root > div:nth-child(2) > div > section:nth-child(2) > div > div > div:nth-child(1) > div > div.car__item-content.mt-4 > button.w-50.car__item-btn.car__btn-rent');

        await page2.click('#root > div:nth-child(2) > div > section:nth-child(2) > div > div > div:nth-child(1) > div > div.car__item-content.mt-4 > button.w-50.car__item-btn.car__btn-rent');

        /* checkout */

        await page2.waitForSelector('#root > div:nth-child(2) > div > section > div > div > div:nth-child(2) > div.checkout-btn > button');

        await page2.click('#root > div:nth-child(2) > div > section > div > div > div:nth-child(2) > div.checkout-btn > button');

        /* fill the form served by stripe gateway and click pay */

        await page2.waitForSelector('#email');
        await page2.type('#email', 'redijprathamesh833@gmail.com')

        await page2.waitForSelector('#shippingName');
        await page2.type('#shippingName', 'Prathamesh Redij');

        await page2.waitForSelector('#shippingAddressLine1');
        await page2.type('#shippingAddressLine1', 'A-1, 2nd Floor, Shreeji Apartment');

        await page2.waitForSelector('#shippingAddressLine2');
        await page2.type('#shippingAddressLine2', 'Near Shreeji Hospital, Opposite Shreeji Temple, Kandivali West');

        await page2.waitForSelector('#shippingLocality');
        await page2.type('#shippingLocality', 'Mumbai');

        await page2.waitForSelector('#shippingPostalCode');
        await page2.type('#shippingPostalCode', '400067');

        await page2.waitForSelector('#shippingAdministrativeArea');
        await page2.select('#shippingAdministrativeArea', 'Maharashtra');

        await page2.waitForSelector('#phoneNumber');
        await page2.type('#phoneNumber', '9876543210');

        await page2.waitForSelector('#cardNumber');
        // await page2.evaluate(() => {
        //     document.querySelector('#cardNumber').value = '4242 4242 4242 4242';
        // });
        await page2.type('#cardNumber', '4242424242424242', { delay: 100 });

        await page2.waitForSelector('#cardExpiry');
        await page2.type('#cardExpiry', '12/24');

        await page2.waitForSelector('#cardCvc');
        await page2.type('#cardCvc', '123');

        await page2.waitForSelector('#root > div > div > div.App-Payment > div > div.flex-container.direction-column > form > div.PaymentForm-confirmPaymentContainer.mt4.flex-item.width-grow > div > div:nth-child(2) > button > div.SubmitButton-IconContainer');

        await page2.click('#root > div > div > div.App-Payment > div > div.flex-container.direction-column > form > div.PaymentForm-confirmPaymentContainer.mt4.flex-item.width-grow > div > div:nth-child(2) > button > div.SubmitButton-IconContainer');

        /* wait for the payment to be processed */
        await page2.waitForSelector('#root > div:nth-child(2) > div > div > h1');

        await page2.screenshot({ path: './screenshots/booking.png' });

        const heading = await page2.$eval('#root > div:nth-child(2) > div > div > h1', el => el.textContent);

        console.log(heading);

        if (heading === 'Success') {
            console.log('Test 1 Passed');
        } else {
            console.log('Test 1 Failed');
        }

        /* close the browser */
        browser.close();
    } catch (error) {
        console.error(error);
    }
}

async function login() {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();

        await page.goto('http://localhost:3000/login');

        await page.focus('#email');
        await page.keyboard.type('redijprathamesh833@gmail.com');
        await page.focus('#password');
        await page.keyboard.type('Tpp#5124');

        await page.click('#login-btn');
    } catch (error) {
        console.error(error);
    }
}

bookTicket();
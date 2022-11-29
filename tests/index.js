const puppeteer = require('puppeteer');

async function bookTicket() {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();

        await page.goto('http://localhost:3000/home');

        await page.select('#location', 'mumbai');
        await page.type('#date', '30/11/2022');
        await page.select('#time', '10:00 AM');

    } catch (error) {
        console.error(error);
    }
}
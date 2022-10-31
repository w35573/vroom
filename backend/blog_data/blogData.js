const axios = require('axios');

// and we need jsdom and Readability to parse the article HTML
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');

async function getData(url) {
    try {
        const response = await axios.get(url);
        const dom = new JSDOM(response.data, { url: url });
        const article = new Readability(dom.window.document).parse();
        return {
            content: article.textContent
        };
    } catch (error) {
        console.log(error);
    }
}

exports.getData = getData;
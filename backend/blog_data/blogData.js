const fetch = require('node-fetch');

// we need jsdom and Readability to parse the article HTML
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');

async function getData(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        // console.log(html);
        // const data = await response.json();
        const dom = new JSDOM(html, { url: url });
        const article = new Readability(dom.window.document).parse();
        return {
            content: article.textContent
        };
    } catch (error) {
        console.log(error);
    }
}

exports.getData = getData;
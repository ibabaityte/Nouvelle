import puppeteer from 'puppeteer';
import sources from '../utils/sources.json' assert {type: 'json'};
import {Result} from "../utils/result.js";

// util imports
import {scrapePages} from "../utils/scrape.js";

const Scrape = async (req, res) => {
// scraping results
    let links = [];
    let imgs = [];
    let names = [];
    let prices = [];

    // correct link for generating
    let link;

    // generated results
    let results = [];

    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ],
    });

    const page = await browser.newPage();
    await page.setRequestInterception(true);
    await page.setUserAgent( 'UA-TEST' );

    page.on('request', (req) => {
        if(req.resourceType() === 'stylesheet' || req.resourceType() === 'font' || req.resourceType() === 'image' || req.resourceType() === 'media' || req.resourceType() === 'script' || req.resourceType() === 'websocket' || req.resourceType() === 'xhr' || req.resourceType() === 'manifest' || req.resourceType() === 'fetch'){
            req.abort();
        }
        else {
            req.continue();
        }
    });

    for(let i = 0; i < sources.length; i++){
        if(sources[i].countByPage === 'true') {
            let newLink = sources[i].searchUrl.replace('$argument$', 'lupazis');
            link = newLink.replace('$pageNumber$', '0');
        } else {
            let newLink = sources[i].searchUrl.replace('$argument$', 'lupazis');
            link = newLink.replace('$productOffset$', '0');
        }

        await scrapePages(page, i, link, links, imgs, names, prices);
    }

    for(let i = 0; i < links.length; i++){
        results.push(new Result(links[i], names[i], imgs[i], prices[i]));
    }

    const t1 = performance.now();
    console.log(t1);

    await browser.close();
    res.send(results)
}

export default {
    Scrape
}

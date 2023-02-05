import {Cluster} from "puppeteer-cluster"

// util imports
import {Result} from "../utils/result.js";
import sources from '../utils/sources.json' assert {type: 'json'};
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

    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 10,
        puppeteerOptions: {
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--disable-gpu'
            ]
        }
    });

    await cluster.task(async ({page, data: {i, link, links, imgs, names, prices}}) => scrapePages(page, i, link, links, imgs, names, prices));

    for(let i = 0; i < sources.length; i++){
        if(sources[i].countByPage) {
            let newLink = sources[i].searchUrl.replace('$argument$', 'loreal');
            link = newLink.replace('$pageNumber$', '0');
        } else {
            let newLink = sources[i].searchUrl.replace('$argument$', 'loreal');
            link = newLink.replace('$productOffset$', '0');
        }

        // await scrapePages(page, i, link, links, imgs, names, prices);
        await cluster.queue({i, link, links, imgs, names, prices});
    }

    await cluster.idle();
    await cluster.close();

    for(let i = 0; i < links.length; i++){
        results.push(new Result(links[i], names[i], imgs[i], prices[i]));
    }

    res.send(results)
}

export default {
    Scrape
}

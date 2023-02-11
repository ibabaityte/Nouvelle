import {Cluster} from "puppeteer-cluster"

// util imports
import {Result} from "../utils/result.js";
import sources from '../utils/sources.json' assert {type: 'json'};
import {scrapePages} from "../utils/scrape.js";

const Scrape = async (req, res) => {

    // scraping results
    let links = [[], [], [], []];
    let imgs = [[], [], [], []];
    let names = [[], [], [], []];
    let prices = [[], [], [], []];

    // correct link for generating
    let link;

    // generated results
    let results = [];

    process.setMaxListeners(Infinity);

    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_BROWSER,
        maxConcurrency: 10,
        puppeteerOptions: {
            headless: true
        }
    });

    await cluster.task(async ({page, data: {i, link, links, imgs, names, prices}}) => scrapePages(page, i, link, links, imgs, names, prices));

    for(let i = 0; i < sources.length; i++){
        if(sources[i].countByPage) {
            let newLink = sources[i].searchUrl.replace('$argument$', 'kremas');
            link = newLink.replace('$pageNumber$', '0');
        } else {
            let newLink = sources[i].searchUrl.replace('$argument$', 'kremas');
            link = newLink.replace('$productOffset$', '0');
        }

        // await scrapePages(page, i, link, links[i], imgs[i], names[i], prices[i]);
        await cluster.queue({i, link, links, imgs, names, prices});
    }

    await cluster.idle();
    await cluster.close();

    for(let i = 0; i < links.length; i++){
        for(let j = 0; j < links[i].length; j++){
            results.push(new Result(links[i][j], names[i][j], imgs[i][j], prices[i][j]));
        }
    }

    res.send(results)
}

export default {
    Scrape
}

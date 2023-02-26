import {Cluster} from "puppeteer-cluster"

// util imports
import {Result} from "../utils/result.js";
import sources from '../utils/sources.json' assert {type: 'json'};
import {scrapePages} from "../utils/scrape.js";
import {myCache} from "../utils/cacheProvider.js";

const Scrape = async (req, res) => {

    let query = req.query.query;
    let page = req.query.currentPage;
    let kristianaPage = req.query.kristianaCurrentPage;
    let offset = req.query.productOffset;


    if(myCache.has(query + page)){
        console.log("yra");
        res.send(myCache.get(query + page))
    } else {
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
            concurrency: Cluster.CONCURRENCY_CONTEXT,
            maxConcurrency: 10,
            timeout: 10000,
            puppeteerOptions: {
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-notifications',
                    '--disable-extensions',
                    '--disable-gpu',
                ]
            }
        });

        await cluster.task(async ({page, data: {i, shop, link, links, imgs, names, prices}}) => scrapePages(page, i, shop, link, links, imgs, names, prices));

        for(let i = 0; i < sources.length; i++){
            if(sources[i].countByPage) {
                let newLink = sources[i].searchUrl.replace('$argument$', query);
                if(sources[i].name === "Kristiana LT") {
                    link = newLink.replace('$pageNumber$', kristianaPage);
                } else {
                    link = newLink.replace('$pageNumber$', page);
                }
            } else {
                let newLink = sources[i].searchUrl.replace('$argument$', query);
                link = newLink.replace('$productOffset$', offset);
            }

            let shop = sources[i].name;

            await cluster.queue({i, shop, link, links, imgs, names, prices});
        }

        await cluster.idle();
        await cluster.close();

        for(let i = 0; i < links.length; i++){
            for(let j = 0; j < links[i].length; j++){
                results.push(new Result(links[i][j], names[i][j], imgs[i][j], prices[i][j]));
            }
        }

        myCache.set(query + page, results, 300000);

        res.send(results)
    }
}

export default {
    Scrape
}

// util imports
import {Result} from "../utils/result.js";
import {initCluster, scrapeCluster} from "../utils/scrapeUtils.js";
import {myCache} from "../utils/cacheProvider.js";
import {validateRequest, validateResults} from "../utils/validation.js";

const Scrape = async (req, res) => {

    let query = req.query.query;
    let page = req.query.currentPage;
    let kristianaPage = req.query.kristianaCurrentPage;
    let offset = req.query.productOffset;

    if(!validateRequest(req)) {
        return res.status(404).send({
            message: "Something went wrong. Try again."
        });
    }

    if (myCache.has(query + page)) {
        res.send(myCache.get(query + page))
    } else {
        // scraping results
        var links = [[], [], [], []];
        var images = [[], [], [], []];
        var names = [[], [], [], []];
        var prices = [[], [], [], []];

        // generated results
        var results = [];

        const cluster = await initCluster();

        await scrapeCluster(
            cluster,
            query,
            page,
            kristianaPage,
            offset,
            links,
            images,
            names,
            prices
        );

        for (let i = 0; i < links.length; i++) {
            for (let j = 0; j < links[i].length; j++) {
                results.push(new Result(links[i][j], names[i][j], images[i][j], prices[i][j]));
            }
        }

        myCache.set(query + page, results, 300000);

        res
            .status(validateResults(results) ? 200 : 404)
            .send(validateResults(results) ? results : {
                message: "No products found. Try again. "
            })
    }
}

export default {
    Scrape
}

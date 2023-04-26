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

    // generated results
    var results = [];

    if(req.query.query === undefined || req.query.query.length < 1) {
        return res.status(404).send({
            message: "Įveskite paieškos žodžius ir bandykite dar kartą."
        });
    }

    if(!validateRequest(req)) {
        return res.status(404).send({
            message: "Įvyko klaida. Bandykite dar kartą"
        });
    }

    if (myCache.has(query + page)) {
        results = myCache.get(query + page);
    } else {

        // scraping results
        var links = [[], [], [], []];
        var images = [[], [], [], []];
        var names = [[], [], [], []];
        var prices = [[], [], [], []];
        var reducedPrices = [[], [], [], []];

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
            prices,
            reducedPrices
        );

        for (let i = 0; i < links.length; i++) {
            for (let j = 0; j < links[i].length; j++) {
                results.push(new Result(links[i][j], names[i][j], images[i][j], prices[i][j], reducedPrices[i][j]));
            }
        }

        myCache.set(query + page, results, 300000);
    }

    res
        .status(validateResults(results) ? 200 : 404)
        .send(validateResults(results) ? results : {
            message: "Nerasta jokių produktų. Bandykite dar kartą."
        })
}

export default {
    Scrape
}

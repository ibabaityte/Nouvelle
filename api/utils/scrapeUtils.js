import sourceJson from "../utils/sources.json" assert {type: "json"};
import {Cluster} from "puppeteer-cluster";

const scrapeCluster = async (cluster, query, page, kristianaPage, offset, links, images, names, prices) => {
    await cluster.task(async ({page, data: {i, shop, link, links, images, names, prices}}) => scrapePages(page, i, shop, link, links, images, names, prices));

    for(let i = 0; i < sourceJson.length; i++){
        let link = generateLink(i, query, kristianaPage, page, offset);
        let shop = sourceJson[i].name;
        await cluster.queue({i, shop, link, links, images, names, prices});
    }

    await cluster.idle();
    await cluster.close();
};

const initCluster = async () => {
    process.setMaxListeners(Infinity);
    return await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 4,
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
};

const generateLink = (i, query, kristianaPage, page, offset) => {
    if(sourceJson[i].countByPage) {
        let newLink = sourceJson[i].searchUrl.replace('$argument$', query);
        return newLink.replace('$pageNumber$', sourceJson[i].name === "Kristiana LT" ? kristianaPage : page);
    } else {
        let newLink = sourceJson[i].searchUrl.replace('$argument$', query);
        return newLink.replace('$productOffset$', offset);
    }
}

const scrapePages = async (page, i, shop, link, linksArray, imgsArray, namesArray, pricesArray) => {
    await page.setUserAgent('UA-TEST');
    await page.setRequestInterception(true);
    page.on('request', (request) => {
        if (['stylesheet', 'font', 'image'].indexOf(request.resourceType()) !== -1) {
            return request.abort();
        } else {
            request.continue();
        }
    });

    await page.goto(link, {waitUntil: "domcontentloaded"});

    // if(shop === "Drogas LT" || shop === "Douglas LT") {
        await page.waitForTimeout(3000);
    // }

    const resultBoxes = await page.$x(sourceJson[i].resultBoxes);

    // links
    const linkHandles = await Promise.all(resultBoxes.map(res => res.$(sourceJson[i].aTag)));
    const linkJsHandles = await Promise.all(linkHandles.map(res => res.getProperty(sourceJson[i].hrefAttr)));
    await Promise.all(linkJsHandles.map(async res => linksArray[i].push(await res.jsonValue())));

    // imgs
    let images;
    if(sourceJson[i].isDataSrc) {
        images = await page.$$eval(sourceJson[i].imgElement, el => el.map(x => x.getAttribute("data-src")));
    } else {
        images = await page.$$eval(sourceJson[i].imgElement, el => el.map(x => x.getAttribute("src")));
    }

    for(let j = 0; j < images.length; j++) {
        if(!sourceJson[i].wholeUrl){
            imgsArray[i].push(sourceJson[i].url + images[j]);
        } else {
            imgsArray[i].push(images[j]);
        }
    }

    // name
    const nameHandles = await Promise.all(resultBoxes.map(res => res.$(sourceJson[i].nameElement)));
    const nameJsHandles = await Promise.all(nameHandles.map(res => res.getProperty(sourceJson[i].innerText)));
    await Promise.all(nameJsHandles.map(async res => namesArray[i].push(await res.jsonValue())));

    // price
    const priceHandles = await Promise.all(resultBoxes.map(res => res.$(sourceJson[i].priceElement)));
    const priceJsHandles = await Promise.all(priceHandles.map(res => res.getProperty(sourceJson[i].innerText)));
    await Promise.all(priceJsHandles.map(async res => pricesArray[i].push(await res.jsonValue())));

}

export {
    initCluster,
    scrapeCluster,
    scrapePages,
    generateLink
}

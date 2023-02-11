import sources from "../utils/sources.json" assert {type: 'json'};

const scrapePages = async (page, i, link, linksArray, imgsArray, namesArray, pricesArray) => {
    await page.setUserAgent( 'UA-TEST' );
    await page.setRequestInterception(true);
    page.on('request', (request) => {
        if (['stylesheet', 'font', 'image'].indexOf(request.resourceType()) !== -1) {
            request.abort();
        } else {
            request.continue();
        }
    });

    await page.goto(link);

    const resultBoxes = await page.$x(sources[i].resultBoxes);

    // links
    const linkHandles = await Promise.all(resultBoxes.map(res => res.$(sources[i].aTag)));
    const linkJsHandles = await Promise.all(linkHandles.map(res => res.getProperty(sources[i].hrefAttr)));
    await Promise.all(linkJsHandles.map(async res => linksArray[i].push(await res.jsonValue())));

    // imgs
    let images;
    if(sources[i].isDataSrc) {
        images = await page.$$eval(sources[i].imgElement, el => el.map(x => x.getAttribute("data-src")));
    } else {
        images = await page.$$eval(sources[i].imgElement, el => el.map(x => x.getAttribute("src")));
    }

    for(let j = 0; j < images.length; j++) {
        if(!sources[i].wholeUrl){
            imgsArray[i].push(sources[i].url + images[j]);
        } else {
            imgsArray[i].push(images[j]);
        }
    }

    // name
    const nameHandles = await Promise.all(resultBoxes.map(res => res.$(sources[i].nameElement)));
    const nameJsHandles = await Promise.all(nameHandles.map(res => res.getProperty(sources[i].innerText)));
    await Promise.all(nameJsHandles.map(async res => namesArray[i].push(await res.jsonValue())));

    // price
    const priceHandles = await Promise.all(resultBoxes.map(res => res.$(sources[i].priceElement)));
    const priceJsHandles = await Promise.all(priceHandles.map(res => res.getProperty(sources[i].innerText)));
    await Promise.all(priceJsHandles.map(async res => pricesArray[i].push(await res.jsonValue())));
}

export {
    scrapePages
}

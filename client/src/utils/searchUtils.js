import axios from "axios";

const fetchProducts = (results, setResults, query, prevQuery, setPrevQuery, currentPage, setCurrentPage, kristianaCurrentPage, setKristianaCurrentPage, productOffset, setProductOffset) => {
    let page = currentPage;
    let kristianaPage = kristianaCurrentPage;
    let offset = productOffset;
    axios.get("http://localhost:8080/scrape", {
        'params': {
            'query': query,
            'currentPage': currentPage,
            'kristianaCurrentPage': kristianaCurrentPage,
            'productOffset': productOffset
        }
    }).then(result => {
        if(query === prevQuery) {
            let resultArray = [...results, ...result.data];
            setResults(resultArray);
        } else {
            setCurrentPage(0);
            setKristianaCurrentPage(1);
            setProductOffset(0);
            setResults(result.data);
        }
    });

    page++;
    setCurrentPage(page);
    kristianaPage++;
    setKristianaCurrentPage(kristianaPage);
    offset += 40;
    setProductOffset(offset);

    setPrevQuery(query);
}

export {
    fetchProducts
}

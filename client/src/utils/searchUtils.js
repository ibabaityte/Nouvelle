import axios from "axios";

const fetchProducts = (results, setResults, query, currentPage, setCurrentPage, kristianaCurrentPage, setKristianaCurrentPage, productOffset, setProductOffset) => {
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
        let resultArray = [...results, ...result.data];
        setResults(resultArray);
    });

    page++;
    setCurrentPage(page);
    kristianaPage++;
    setKristianaCurrentPage(kristianaPage);
    offset += 40;
    setProductOffset(offset);
}

export {
    fetchProducts
}

import axios from "axios";

const fetchProducts = async (results, setResults, query, prevQuery, setPrevQuery, currentPage, setCurrentPage, kristianaCurrentPage, setKristianaCurrentPage, productOffset, setProductOffset) => {
    let page = currentPage;
    let kristianaPage = kristianaCurrentPage;
    let offset = productOffset;

    if(query !== prevQuery && page > 0) {
        page = 0;
        kristianaPage = 1;
        offset = 0;

        setCurrentPage(page);
        setKristianaCurrentPage(kristianaPage);
        setProductOffset(offset);
    }

    axios.get("http://localhost:8080/scrape", {
        'params': {
            'query': query,
            'currentPage': page,
            'kristianaCurrentPage': kristianaPage,
            'productOffset': offset
        }
    }).then(result => {
        if(query === prevQuery) {
            let resultArray = [...results, ...result.data];
            setResults(resultArray);

            page++;
            kristianaPage++;
            offset += 40;

            setKristianaCurrentPage(kristianaPage);
            setCurrentPage(page);
            setProductOffset(offset);
        } else {
            setResults(result.data);

            page++;
            kristianaPage++;
            offset += 40;

            setKristianaCurrentPage(kristianaPage);
            setCurrentPage(page);
            setProductOffset(offset);
        }

        setPrevQuery(query);
    });
}

export {
    fetchProducts
}

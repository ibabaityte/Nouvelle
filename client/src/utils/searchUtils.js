import axios from "axios";

const fetchProducts = async (results, setResults, query, prevQuery, setPrevQuery, currentPage, setCurrentPage, kristianaCurrentPage, setKristianaCurrentPage, productOffset, setProductOffset) => {
    let page = currentPage;
    let kristianaPage = kristianaCurrentPage;
    let offset = productOffset;

    if (query !== prevQuery && page > 0) {
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
        if (query === prevQuery) {
            let resultArray = sortByRelevance(null, "relevance", null, [...results, ...result.data], query, null);
            setResults(resultArray);

            page++;
            kristianaPage++;
            offset += 40;

            setKristianaCurrentPage(kristianaPage);
            setCurrentPage(page);
            setProductOffset(offset);
        } else {
            let resultArray = sortByRelevance(null, "relevance", null, result.data, query, null);
            setResults(resultArray);

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

const sortByRelevance = (e, param, setParam, array, query, setResults) => {
    let queryStringArray = query.split(" ");
    let sorted = array.map(entry => {
        let points = 0;
        if (queryStringArray.some(substring => entry.name.toLowerCase().includes(substring))) {
            points += 2;
        }
        if (queryStringArray.some(substring => entry.name.toLowerCase().includes(substring))) {
            points += 1;
        }
        return {...entry, points};
    }).sort((a, b) => b.points - a.points);

    if (setResults) {
        setParam(e.target.value);
        setResults(sorted);
    } else {
        return sorted;
    }
}

const sortByPrice = (e, setParam, array, setResults) => {
    let sorted = array.sort((a, b) => a.price > b.price ? 1 : -1);
    setParam(e.target.value);
    setResults(sorted);
}

const sortAlphabetically = (e, setParam, array, setResults) => {
    let sorted = array.sort((a, b) => a.name > b.name ? 1 : -1);
    setParam(e.target.value);
    setResults(sorted);
}

export {
    fetchProducts,
    sortByRelevance,
    sortByPrice,
    sortAlphabetically
}

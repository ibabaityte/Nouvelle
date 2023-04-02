import axios from "axios";

const fetchProducts = async (query, currentPage, kristianaCurrentPage, productOffset) => {
    let emptyArray = [];
    await axios.get("http://localhost:8080/scrape", {
        'params': {
            'query': query,
            'currentPage': currentPage,
            'kristianaCurrentPage': kristianaCurrentPage,
            'productOffset': productOffset
        }
    }).then(result => {
        emptyArray = result.data;
    }).catch(e => {
        alert(e.response.data.message);
    });
    return emptyArray;
}

const sortByRelevance = (array, query) => {
    let queryStringArray = query.split(" ");
    return array.map(entry => {
        let points = 0;
        if (queryStringArray.some(substring => entry.name.toLowerCase().includes(substring))) {
            points += 1;
        }
        return {...entry, points};
    }).sort((a, b) => b.points - a.points);
}

const sortByPriceAsc = (array) => {
    return array.sort((a, b) => {
        const priceA = +a.price.replace("€", "").replace(",", ".");
        const priceB = +b.price.replace("€", "").replace(",", ".");
        return priceA > priceB ? 1 : -1;
    });
}

const sortByPriceDesc = (array) => {
    return sortByPriceAsc(array).reverse();
};

const sortAlphabeticallyAsc = (array) => {
    return array.sort((a, b) => a.name > b.name ? 1 : -1);
};

const sortAlphabeticallyDesc = (array) => {
    return sortAlphabeticallyAsc(array).reverse();
};

export {
    fetchProducts,
    sortByRelevance,
    sortByPriceAsc,
    sortByPriceDesc,
    sortAlphabeticallyAsc,
    sortAlphabeticallyDesc
}

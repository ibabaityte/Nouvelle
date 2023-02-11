import axios from "axios";

const fetchProducts = (setResults, query) => {
    axios.get("http://localhost:8080/scrape", {
        'params': {
            'query': query
        }
    }).then(result => {
        setResults(result);
    });
}

export {
    fetchProducts
}

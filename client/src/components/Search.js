import {useState} from "react";

// utils imports
import {fetchProducts} from "../utils/searchUtils";

const Search = (props) => {

    const {
        results,
        setResults,
        currentPage,
        setCurrentPage,
        kristianaCurrentPage,
        setKristianaCurrentPage,
        productOffset,
        setProductOffset
    } = props;

    const [prevQuery, setPrevQuery] = useState("");
    const [query, setQuery] = useState("");

    return (
        <div>
            <input type="text" onChange={(e) => setQuery(e.target.value)}/>
            <button onClick={() => fetchProducts(results, setResults, query, prevQuery, setPrevQuery, currentPage, setCurrentPage, kristianaCurrentPage, setKristianaCurrentPage, productOffset, setProductOffset)}>Search</button>
        </div>
    );
}

export default Search;

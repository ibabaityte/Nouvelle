// utils imports
import {fetchProducts} from "../utils/searchUtils";

const Search = (props) => {

    const {
        prevQuery,
        setPrevQuery,
        query,
        setQuery,
        results,
        setResults,
        currentPage,
        setCurrentPage,
        kristianaCurrentPage,
        setKristianaCurrentPage,
        productOffset,
        setProductOffset
    } = props;

    return (
        <div>
            <input type="text" onChange={(e) => setQuery(e.target.value)}/>
            <button onClick={() => fetchProducts(results, setResults, query, prevQuery, setPrevQuery, currentPage, setCurrentPage, kristianaCurrentPage, setKristianaCurrentPage, productOffset, setProductOffset)}>Search</button>
        </div>
    );
}

export default Search;

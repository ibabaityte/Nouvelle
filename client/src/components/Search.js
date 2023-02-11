import {useState} from "react";

// utils imports
import {fetchProducts} from "../utils/searchUtils";

const Search = (props) => {

    const {
        setResults
    } = props;

    const [query, setQuery] = useState("");

    return (
        <div>
            <input type="text" onChange={(e) => setQuery(e.target.value)}/>
            <button onClick={() => fetchProducts(setResults, query)}>Search</button>
        </div>
    );
}

export default Search;

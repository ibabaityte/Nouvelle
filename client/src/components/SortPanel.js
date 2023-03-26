import {sortAlphabetically, sortByPrice, sortByRelevance} from "../utils/searchUtils";
const SortPanel = (props) => {

    const {
        results,
        setResults,
        sortParam,
        setSortParam,
        query
    } = props;

    return (
        <div>
            <div>Sort by:</div>
            <button onClick={(e) => sortByRelevance(e, sortParam, setSortParam, results, query, setResults)} value="relevance">Relevance</button>
            <button onClick={(e) => sortByPrice(e, setSortParam, results, setResults)} value="price">Price</button>
            <button onClick={(e) => sortAlphabetically(e, setSortParam, results, setResults)} value="alphabetically">Alphabetically</button>
        </div>
    );
}

export default SortPanel;

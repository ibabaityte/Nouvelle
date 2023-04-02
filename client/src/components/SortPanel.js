import {
    sortByRelevance,
    sortByPriceAsc,
    sortByPriceDesc,
    sortAlphabeticallyAsc,
    sortAlphabeticallyDesc
} from "../utils/searchUtils";

const SortPanel = (props) => {
    const {
        results,
        setResults,
        sortParam,
        setSortParam,
        query,
        setActivePage,
        getProductPages,
        pageSize
    } = props;

    const resetSearchState = () => {
        setActivePage(0);
    };

    const applySort = (e) => {
        const sort = e.target.value;
        setSortParam(sort);
        let sorted;
        switch (sort) {
            case "relevance":
                sorted = sortByRelevance(results, query);
                break;
            case "priceAsc":
                sorted = sortByPriceAsc(results);
                break;
            case "priceDesc":
                sorted = sortByPriceDesc(results);
                break;
            case "az":
                sorted = sortAlphabeticallyAsc(results);
                break;
            case "za":
                sorted = sortAlphabeticallyDesc(results);
                break;
            default:
                sorted = sortByRelevance(results, query);
        }
        setResults(sorted);
        getProductPages(sorted, pageSize);
        resetSearchState();
    };

    return (
        <div>
            <div>Sort by:</div>
            <button
                onClick={(e) => applySort(e)} value="relevance"
                disabled={sortParam === "relevance"}
            >Relevance</button>
            <button
                onClick={(e) => applySort(e)} value="priceAsc"
                disabled={sortParam === "priceAsc"}
            >Price ascending</button>
            <button
                onClick={(e) => applySort(e)} value="priceDesc"
                disabled={sortParam === "priceDesc"}
            >Price descending</button>
            <button
                onClick={(e) => applySort(e)} value="az"
                disabled={sortParam === "az"}
            >A-Z</button>
            <button
                onClick={(e) => applySort(e)} value="za"
                disabled={sortParam === "za"}
            >Z-A</button>
        </div>
    );
}

export default SortPanel;

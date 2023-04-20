import SortButtons from "./SortButtons";
import SortSelect from "./SortSelect";
import {
    sortByRelevance,
    sortByPriceAsc,
    sortByPriceDesc,
    sortAlphabeticallyAsc,
    sortAlphabeticallyDesc
} from "../../utils/searchUtils";
import {sortPanel, sortButtons} from "../../styles/SortPanelStyles";
import {label} from "../../styles/ButtonGroupStyles";

const SortPanel = (props) => {
    const {
        results,
        setResults,
        sortParam,
        setSortParam,
        query,
        setActivePage,
        getProductPages,
        pageSize,
        windowSize
    } = props;

    const resetSearchState = () => {
        setActivePage(0);
    };

    const applySort = (e) => {
        if (e.preventDefault) {
            e.preventDefault();
            if (e.target.tagName && ['svg', 'path'].includes(e.target.tagName.toLowerCase())) return;
        }
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
        <div style={sortPanel}>
            {
                windowSize > 1300 ?
                    <div style={sortButtons}>
                        <div style={label}>Rūšiuoti:</div>
                        <SortButtons
                            sortParam={sortParam}
                            applySort={applySort}
                        />
                    </div>
                    :
                    <SortSelect
                        sortParam={sortParam}
                        applySort={applySort}
                    />
            }
        </div>
    );
}

export default SortPanel;

import {useState} from "react";
// component imports
import Search from "./components/Search";
import ProductList from "./components/ProductList";
import SortPanel from "./components/SortPanel";
import Pagination from "./components/Pagination";
import ResultCounter from "./components/ResultCounter";
import PageSizePanel from "./components/PageSizePanel";
import {
    fetchProducts,
    sortAlphabeticallyAsc, sortAlphabeticallyDesc,
    sortByPriceAsc,
    sortByPriceDesc,
    sortByRelevance
} from "./utils/searchUtils";

const App = () => {
    const [results, setResults] = useState([]);
    const [pages, setPages] = useState([]);
    const [activePage, setActivePage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [kristianaCurrentPage, setKristianaCurrentPage] = useState(1);
    const [productOffset, setProductOffset] = useState(0);
    const [sortParam, setSortParam] = useState("relevance");
    const [prevQuery, setPrevQuery] = useState("");
    const [query, setQuery] = useState("");

    const sortAfterSearch = (array) => {
        const sort = sortParam;
        let sorted;
        switch (sort) {
            case "relevance":
                sorted = sortByRelevance(array, query);
                break;
            case "priceAsc":
                sorted = sortByPriceAsc(array);
                break;
            case "priceDesc":
                sorted = sortByPriceDesc(array);
                break;
            case "az":
                sorted = sortAlphabeticallyAsc(array);
                break;
            case "za":
                sorted = sortAlphabeticallyDesc(array);
                break;
            default:
                sorted = sortByRelevance(array, query);
        }
        return sorted;
    };

    const getProductList = async () => {
        let page = currentPage;
        let kristianaPage = kristianaCurrentPage;
        let offset = productOffset;
        if (query !== prevQuery) {
            page = 0;
            kristianaPage = 1;
            offset = 0;
        } else {
            page++;
            kristianaPage++;
            offset += 40;
        }
        setKristianaCurrentPage(kristianaPage);
        setCurrentPage(page);
        setProductOffset(offset);

        const products = await fetchProducts(query, page, kristianaPage, offset);
        const resultArray = sortAfterSearch(query === prevQuery ? [...results, ...products] : products, query);

        setResults(resultArray);
        getProductPages(resultArray, pageSize);

        setPrevQuery(query);
    };

    const getProductPages = (array, pageSize) => {
        const resultPages = [];
        for(let x = 0; x < array.length; x += pageSize) {
            const page = array.slice(x, x + pageSize);
            resultPages.push(page);
        }
        setPages(resultPages);
    }

    const changePageSize = (e) => {
        const size = +e.target.value;
        getProductPages(results, size);
        setPageSize(size);
    };

    return (
        <div className="App">
            <Search
                setQuery={setQuery}
                getProductList={getProductList}
            />
            <SortPanel
                results={results}
                setResults={setResults}
                sortParam={sortParam}
                setSortParam={setSortParam}
                query={query}
                setActivePage={setActivePage}
                getProductPages={getProductPages}
                pageSize={pageSize}
            />
            <PageSizePanel
                changePageSize={changePageSize}
                pageSize={pageSize}
            />
            <ResultCounter
                pages={pages}
                results={results}
            />
            <ProductList
                pages={pages}
                activePage={activePage}
            />
            <Pagination
                pages={pages}
                activePage={activePage}
                setActivePage={setActivePage}
            />
        </div>
    );
}

export default App;

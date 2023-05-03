import {useEffect, useState} from "react";

// style imports
import './App.css';
import {mainDiv} from "./styles/MainPageStyles";

// component imports
import Search from "./components/Search";
import ProductList from "./components/ProductList";
import Pagination from "./components/Pagination";
import ResultParamPanel from "./components/ResultParamPanel";
import Header from "./components/Header";
import {
    fetchProducts,
    sortAlphabeticallyAsc, sortAlphabeticallyDesc,
    sortByPriceAsc,
    sortByPriceDesc,
    sortByRelevance
} from "./utils/searchUtils";

const App = () => {
    const [results, setResults] = useState([]);
    const [searchStatus, setSearchStatus] = useState("idle");
    const [pages, setPages] = useState([]);
    const [activePage, setActivePage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [kristianaCurrentPage, setKristianaCurrentPage] = useState(1);
    const [productOffset, setProductOffset] = useState(0);
    const [sortParam, setSortParam] = useState("relevance");
    const [prevQuery, setPrevQuery] = useState("");
    const [query, setQuery] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener("resize", () => {setWindowSize(window.innerWidth)});
        window.removeEventListener("resize", () => {setWindowSize(window.innerWidth)});
    }, [window.innerWidth]);

    useEffect(() => {
        let timer = setTimeout(() => setErrorMessage(""), 5000);
        return () => {
            clearTimeout(timer);
        };
    }, [errorMessage]);

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

    const getProductList = async (e, setErrorMessage) => {
        e.preventDefault();
        let page = currentPage;
        let kristianaPage = kristianaCurrentPage;
        let offset = productOffset;

        setSearchStatus("loading");
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

        const products = await fetchProducts(query, page, kristianaPage, offset, setErrorMessage, setSearchStatus);
        const resultArray = sortAfterSearch(query === prevQuery ? [...results, ...products] : products, query);
        resultArray.length > 0 ? setSearchStatus("loaded") : setSearchStatus("idle");

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
        if(activePage > 0 && activePage >= resultPages.length) {
            let page = resultPages.length - 1;
            setActivePage(page);
            document.querySelectorAll("#pagination li")[resultPages.length].classList.add("selected");
        }
        setPages(resultPages);
    }

    const changePageSize = (e) => {
        const size = +e.target.value;
        getProductPages(results, size);
        setPageSize(size);
    };

    return (
        <div id="main-div" className="App" style={mainDiv}>
            <Header/>
            <Search
                query={query}
                setQuery={setQuery}
                getProductList={getProductList}
                pages={pages}
                results={results}
                windowSize={windowSize}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
            />
            <ResultParamPanel
                results={results}
                setResults={setResults}
                sortParam={sortParam}
                setSortParam={setSortParam}
                query={query}
                setActivePage={setActivePage}
                getProductPages={getProductPages}
                windowSize={windowSize}
                changePageSize={changePageSize}
                pageSize={pageSize}
            />
            <ProductList
                pages={pages}
                activePage={activePage}
                searchStatus={searchStatus}
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

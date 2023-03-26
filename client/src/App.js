import {useState} from "react";

// component imports
import Search from "./components/Search";
import ProductList from "./components/ProductList";
import SortPanel from "./components/SortPanel";

const App = () => {

    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [kristianaCurrentPage, setKristianaCurrentPage] = useState(1);
    const [productOffset, setProductOffset] = useState(0);
    const [sortParam, setSortParam] = useState("relevance");
    const [prevQuery, setPrevQuery] = useState("");
    const [query, setQuery] = useState("");

    return (
        <div className="App">
            <Search
                prevQuery={prevQuery}
                setPrevQuery={setPrevQuery}
                query={query}
                setQuery={setQuery}
                results={results}
                setResults={setResults}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                kristianaCurrentPage={kristianaCurrentPage}
                setKristianaCurrentPage={setKristianaCurrentPage}
                productOffset={productOffset}
                setProductOffset={setProductOffset}
            />
            <SortPanel
                results={results}
                setResults={setResults}
                sortParam={sortParam}
                setSortParam={setSortParam}
                query={query}
            />
            <ProductList
                results={results}
            />
        </div>
    );
}

export default App;

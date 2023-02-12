import {useState} from "react";

// component imports
import Search from "./components/Search";
import ProductList from "./components/ProductList";

const App = () => {

    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [kristianaCurrentPage, setKristianaCurrentPage] = useState(1);
    const [productOffset, setProductOffset] = useState(0);

    // console.log(results);
    if(results.length !== 0) {
        for(let i = 0; i < results.length; i++){
            console.log(results[i]);
        }
    }

    return (
        <div className="App">
            <Search
                results={results}
                setResults={setResults}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                kristianaCurrentPage={kristianaCurrentPage}
                setKristianaCurrentPage={setKristianaCurrentPage}
                productOffset={productOffset}
                setProductOffset={setProductOffset}
            />
            <ProductList
                results={results}
            />
        </div>
    );
}

export default App;

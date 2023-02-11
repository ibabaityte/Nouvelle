import {useState} from "react";

// component imports
import Search from "./components/Search";
import ProductList from "./components/ProductList";

const App = () => {

    const [results, setResults] = useState(null);

    return (
        <div className="App">
            <Search
                setResults={setResults}
            />
            <ProductList
                results={results}
            />
        </div>
    );
}

export default App;

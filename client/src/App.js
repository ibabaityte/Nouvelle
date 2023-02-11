import {useEffect, useState} from "react";
import axios from "axios";

// component imports
import Search from "./components/Search";

const App = () => {

    const [results, setResults] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8080/scrape").then(result => {
            setResults(result);
        });
    }, [])

    return (
        <div className="App">
            <Search
                results={results}
            />
        </div>
    );
}

export default App;

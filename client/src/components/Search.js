// style imports
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import ResultCounter from "./ResultCounter";
import Button from '@mui/material/Button';
import {
    searchWrapper,
    searchInput,
    searchForm,
    searchButton
} from "../styles/SearchStyles";
import ErrorIndicator from "./ErrorIndicator";

const Search = (props) => {
    const {
        query,
        setQuery,
        getProductList,
        pages,
        results,
        windowSize,
        errorMessage,
        setErrorMessage
    } = props;

    return (
        <div style={{"display": "grid", "marginTop": "20px"}}>
            {
                errorMessage === "" ?
                    <ResultCounter
                        pages={pages}
                        results={results}
                    />
                    :
                    <ErrorIndicator
                        errorMessage={errorMessage}
                    />
            }
            <div style={searchWrapper}>
                <form onSubmit={(e) => getProductList(e, setErrorMessage)} style={searchForm}>
                    <TextField
                        sx={searchInput}
                        label="Įveskite prekės pavadinimą"
                        variant="standard"
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}/>
                    <Button
                        variant="outlined"
                        sx={searchButton}
                        type="submit">
                        {
                            windowSize > 1000 ?
                                "Ieškoti"
                                :
                                <SearchIcon/>
                        }
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Search;

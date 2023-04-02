const Search = (props) => {
    const {
        setQuery,
        getProductList,
    } = props;

    return (
        <div>
            <input type="text" onChange={(e) => setQuery(e.target.value)}/>
            <button
                onClick={async () => await getProductList()}>Search
            </button>
        </div>
    );
}

export default Search;

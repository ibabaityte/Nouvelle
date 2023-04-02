const ProductList = (props) => {

    const {
        pages,
        activePage
    } = props;

    return (
        <div>
            {
                !!pages && pages.length === 0 ?
                    <div>Waiting...</div>
                    :
                    pages[activePage].map((result, key) => {
                        return (
                            <div key={key}>
                                <h2>{result.name}</h2>
                                <a href={result.url} target="_blank" rel="noreferrer" >{result.url}</a>
                                <img src={result.img} alt={"product image"}/>
                                <h3>{result.img}</h3>
                                <h3>{result.price}</h3>
                            </div>
                        );
                    })
            }
        </div>
    );
}

export default ProductList;

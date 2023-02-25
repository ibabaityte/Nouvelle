const ProductList = (props) => {

    const {
        results
    } = props;

    return (
        <div>
            {
                results.length === 0 ?
                    <div>Waiting...</div>
                    :
                    results.map((result, key) => {
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

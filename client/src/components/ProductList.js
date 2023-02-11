const ProductList = (props) => {

    const {
        results
    } = props;

    return (
        <div>
            {
                results === null || results === undefined ?
                    <div>Waiting...</div>
                    :
                    results.data.map((result, key) => {
                        return (
                            <div key={key}>
                                <h2>{result.name}</h2>
                                <a href={result.url} target="_blank">Click here to buy product</a>
                                <img src={result.img} alt="product image"/>
                                <h3>{result.price}</h3>
                            </div>
                        );
                    })
            }
        </div>
    );
}

export default ProductList;

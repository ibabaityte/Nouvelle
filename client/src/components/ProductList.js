import Product from "./Product";
import Spinner from "./Spinner";
import {
    productList
} from "../styles/Product";
import Grid from '@mui/material/Grid';
import EmptyProductList from "./EmptyProductList";

const ProductList = (props) => {

    const {
        pages,
        activePage,
        searchStatus
    } = props;

    return (
        <Grid container sx={productList}>
            {
                searchStatus === "loading" && <Spinner/>
            }
            {
                searchStatus === "loaded" && pages.length > 0 &&
                pages[activePage].map((result, key) => {
                    return (
                        <Grid item key={key} xl={4} lg={5} md={6} xs={12} sx={productList}>
                            <Product
                                name={result.name}
                                url={result.url}
                                img={result.img}
                                price={result.price}
                            />
                        </Grid>
                    );
                })
            }
            {
                searchStatus === "idle" && <EmptyProductList/>
            }
        </Grid>
    );
}

export default ProductList;

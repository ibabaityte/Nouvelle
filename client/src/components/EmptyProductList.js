import {productList} from "../styles/Product";
import Product from "./Product";
import Grid from "@mui/material/Grid";
import product from "../images/white-face-cream-tube-beauty-product.jpg";

const EmptyProductList = () => {
    return (
        <Grid container sx={productList}>
            <Grid item xl={4} lg={5} md={6} xs={12} sx={productList}>
                <Product
                    name=""
                    url=""
                    img={product}
                    price=""
                />
            </Grid>
            <Grid item xl={4} lg={5} md={6} xs={12} sx={productList}>
                <Product
                    name=""
                    url=""
                    img={product}
                    price=""
                />
            </Grid>
            <Grid item xl={4} lg={5} md={6} xs={12} sx={productList}>
                <Product
                    name=""
                    url=""
                    img={product}
                    price=""
                />
            </Grid>
            <Grid item xl={4} lg={5} md={6} xs={12} sx={productList}>
                <Product
                    name=""
                    url=""
                    img={product}
                    price=""
                />
            </Grid>
            <Grid item xl={4} lg={5} md={6} xs={12} sx={productList}>
                <Product
                    name=""
                    url=""
                    img={product}
                    price=""
                />
            </Grid>
        </Grid>
    );
}

export default EmptyProductList

import {Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {
    imageCard,
    product,
    productCard,
    cardContent,
    productName,
    priceText,
    cardActions,
    buyButton
} from "../styles/Product";

const Product = (props) => {
    const {
        name,
        url,
        img,
        price
    } = props;

    return (
        <div style={product}>
            <Card sx={productCard}>
                <CardMedia
                    sx={imageCard}
                    component="img"
                    height="200"
                    image={img}
                    alt="product"
                />
                <CardContent sx={cardContent}>
                    <Typography sx={productName}>{name}</Typography>
                </CardContent>
                <CardActions sx={cardActions}>
                    <Typography variant="h7" sx={priceText}>{price}</Typography>
                    <Button variant="contained" sx={buyButton}><a target="_blank" href={url}>Pirkti</a></Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default Product;

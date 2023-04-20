const productList = {
    margin: "20px auto 50px auto",
    width: "90%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

const product = {
    display: "flex",
    margin: "12px",
    minWidth: "100%",
    height: "450px"
}

const productCard = {
    width: "100%"
}

const imageCard = {
    width: "80%",
    margin: "0 auto",
    textAlign: "center",
    objectFit: "contain"
}

const cardContent = {
    minHeight: "150px",
    maxHeight: "150px",
    position: "relative"
}

const productName = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
    maxHeight: "5.4em",
    lineHeight: "1.8em"
}

const priceText = {
    fontWeight: "700",
    fontSize: "25px"
}

const cardActions = {
    padding: "16px !important",
    display: "flex",
    justifyContent: "space-between"
}

const buyButton = {
    backgroundColor: "rgb(214,199,69)",
    "& a": {
        color: "white",
        fontWeight: "700",
        textDecoration: "none",
    },
    "&:hover": {
        backgroundColor: "rgba(214,199,69, 0.5)",
    }
}
export {
    productList,
    product,
    productCard,
    imageCard,
    cardContent,
    productName,
    priceText,
    cardActions,
    buyButton
}

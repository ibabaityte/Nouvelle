export class Result {
    constructor
    (
        url,
        name,
        img,
        price,
        reducedPrice
    ) {
        this.url = url;
        this.name = name;
        this.img = img;
        this.price = price === "0" ? reducedPrice : price;
        this.reducedPrice = reducedPrice;
    }
}

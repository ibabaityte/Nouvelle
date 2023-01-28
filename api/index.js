import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import ProductRoutes from "./routes/products.js";

const api = express();
const port = 8080;

api.use(cors());
api.use(bodyParser.urlencoded({extended: true}));
api.use(bodyParser.json());
api.use(express.json());
api.use(ProductRoutes);

api.listen(port, () => {
    console.log("API running on port " + port);
});

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import ProductRoutes from "./routes/products.js";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());
app.use(ProductRoutes);

export default app;

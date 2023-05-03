import {Router} from "express";
import ProductController from "../controllers/products.js";

const router = Router();

router.get("/scrape", ProductController.Scrape);

export default router;

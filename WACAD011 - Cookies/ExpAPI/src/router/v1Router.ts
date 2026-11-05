import { Router } from "express";
import productRouter from "../resources/product/product.router.js";

const router = Router();

router.use("/products", productRouter);

export default router;

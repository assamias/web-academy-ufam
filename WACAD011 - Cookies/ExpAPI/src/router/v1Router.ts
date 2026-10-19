// associa as rotas de produtos ao roteador principal da API

import productsRouter from "../resourcers/products/products.router";
import { Router } from "express";

const router = Router();

router.use("/products", productsRouter);

export default router;

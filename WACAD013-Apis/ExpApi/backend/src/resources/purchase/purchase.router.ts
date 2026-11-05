import { Router } from "express";
import { addToCart, checkout, getCart } from "./purchase.controller.js";

const router = Router();

router.post("/cart", addToCart);
router.get("/cart", getCart);
router.post("/checkout", checkout);

export default router;

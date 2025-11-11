import { Router } from "express";
import { add, list, checkout } from "./purchaseItem.controller";
import { isAuth } from "../middlewares/isAuth";

const router = Router();

router.get("/cart", isAuth, list);

router.post("/cart", isAuth, add);

router.post("/checkout", isAuth, checkout);

export default router;

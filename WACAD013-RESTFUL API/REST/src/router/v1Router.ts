import productsRouter from "../resourcers/products/products.router";
import { Router } from "express";
import languagesRouter from "../language/languagesRouter";
import usersRouter from "../users/usersRouter";
import authRouter from "../auth/auth.router";
import purchaseRouter from "../purchaseItem/purcahseItem.router";

const router = Router();

router.use(
  "/products",
  // #swagger.tags = ["Products"]
  productsRouter
);
router.use(
  "/languages",
  // #swagger.tags = ["languages"]
  languagesRouter
);
router.use(
  "/users",
  // #swagger.tags = ["users"]
  usersRouter
);
router.use(
  "/auth",
  // #swagger.tags = ["auth"]
  authRouter
);
router.use(
  "/purchase", // #swagger.tags = ["Purchase"]
  purchaseRouter
);

export default router;

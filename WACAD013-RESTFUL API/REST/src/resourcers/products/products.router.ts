//define as rotas e associa elas aos controllers
import { Router } from "express";
import productsController from "./products.controller.js";
import validateSchema from "../../middlewares/validateSchema.js";
import productSchema from "./products.schema.js";
import isAdmin from "../../middlewares/isAdmin.js";

const router = Router();

router.get("/", productsController.index);
router.get("/:id", productsController.read);
router.post(
  "/",
  isAdmin,
  validateSchema(productSchema),
  productsController.create
);
router.put(
  "/:id",
  isAdmin,
  validateSchema(productSchema),
  productsController.update
);
router.delete("/:id", isAdmin, productsController.remove);

export default router;

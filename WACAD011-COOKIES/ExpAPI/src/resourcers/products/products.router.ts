//define as rotas e associa elas aos controllers
import { Router } from "express";
import productsController from "./products.controller.js";
import validateSchema from "../../middlewares/validateSchema.js";
import productSchema from "./products.schema.js";

const router = Router();

router.get("/", productsController.index);
router.get("/:id", productsController.read);
router.post("/", validateSchema(productSchema), productsController.create);
router.put("/:id", validateSchema(productSchema), productsController.update);
router.delete("/:id", productsController.remove);

export default router;

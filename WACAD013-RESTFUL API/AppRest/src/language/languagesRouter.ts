import { Router } from "express";
import changeLanguage from "./languagesController";
import validateSchema from "../middlewares/validateSchema";
import languageSchema from "./languageSchema";
import languagesController from "./languagesController";

const router = Router();

router.put(
  "/",
  validateSchema(languageSchema),
  languagesController.changeLanguage
);

router.delete("/", languagesController.deleteLanguage);

export default router;

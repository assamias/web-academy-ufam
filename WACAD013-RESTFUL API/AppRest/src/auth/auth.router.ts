import { Router } from "express";
import authController from "./auth.controller";
import validateSchema from "../middlewares/validateSchema";
import { signupSchema, loginSchema } from "./auth.schema";

const router = Router();

router.post("/signup", validateSchema(signupSchema), authController.signup);
router.post("/login", validateSchema(loginSchema), authController.login);
router.delete("/logout", authController.logout);

export default router;

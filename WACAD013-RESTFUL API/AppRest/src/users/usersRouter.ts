import { Router } from "express";
import usersController from "./usersController";
import validateSchema from "../middlewares/validateSchema";
import userSchema from "./usersSchema";

const router = Router();

router.post("/", validateSchema(userSchema), usersController.create);

export default router;

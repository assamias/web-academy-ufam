import { Router } from "express";
import usersController from "./usersController";

const router = Router();

router.post("/", usersController.create);
router.get("/", usersController.index);
router.get("/:id", usersController.read);
router.put("/:id", usersController.update);
router.delete("/:id", usersController.remove);

export default router;

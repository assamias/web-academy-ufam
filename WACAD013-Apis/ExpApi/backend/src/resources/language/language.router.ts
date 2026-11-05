import { Router } from "express";
import languageController from "./language.controller.js";
import validate from "../../middleware/validate.js";
import languageSchema from "./language.schema.js";

const router = Router();

/**
 * @openapi
 * /languages:
 *   post:
 *     summary: Altera o idioma preferido (cookie "lang")
 *     tags: [Languages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangeLang'
 *     responses:
 *       200:
 *         description: Idioma alterado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChangeLang'
 */
router.post("/", validate(languageSchema), languageController.changeLang);

export default router;

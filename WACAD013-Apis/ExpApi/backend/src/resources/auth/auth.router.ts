import { Router } from "express";
import authController from "./auth.controller.js";

const router = Router();

/**
 * @openapi
 * /auth/signup:
 *   post:
 *     summary: Cadastra um novo usuário (tipo cliente)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Signup'
 *     responses:
 *       201:
 *         description: Usuário criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       409:
 *         description: E-mail já cadastrado
 */
router.post("/signup", authController.signup);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Autentica um usuário e inicia a sessão
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login efetuado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login", authController.login);

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     summary: Encerra a sessão do usuário
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout efetuado com sucesso
 *       500:
 *         description: Erro ao destruir a sessão
 */
router.post("/logout", authController.logout);

export default router;

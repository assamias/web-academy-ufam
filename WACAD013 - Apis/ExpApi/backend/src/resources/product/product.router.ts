import { Router } from "express";
import productController from "./product.controller.js";
import validate from "../../middleware/validate.js";
import { productSchema } from "./product.schema.js";
import isAdmin from "../../middleware/isAdmin.js";

const router = Router();

/**
 * @openapi
 * /products:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/", productController.index);

/**
 * @openapi
 * /products:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProduct'
 *     responses:
 *       201:
 *         description: Produto criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       403:
 *         description: Usuário não é administrador
 */
router.post("/", isAdmin, validate(productSchema), productController.create);

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     summary: Busca um produto pelo id
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto não encontrado
 */
router.get("/:id", productController.read);

/**
 * @openapi
 * /products/{id}:
 *   put:
 *     summary: Atualiza um produto
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProduct'
 *     responses:
 *       200:
 *         description: Produto atualizado
 *       403:
 *         description: Usuário não é administrador
 */
router.put("/:id", isAdmin, validate(productSchema), productController.update);

/**
 * @openapi
 * /products/{id}:
 *   delete:
 *     summary: Remove um produto
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Produto removido
 *       403:
 *         description: Usuário não é administrador
 */
router.delete("/:id", isAdmin, productController.remove);

export default router;

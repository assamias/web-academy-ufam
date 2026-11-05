import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import type { CreateProductDto } from "./product.types.js";
import {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  removeProduct,
} from "./product.servise.js";
import { productErrors } from "./product.errors.js";

const index = async (req: Request, res: Response) => {
  try {
    const products = await getProducts();
    res.status(StatusCodes.OK).json(products);
  } catch (err) {
    productErrors(err, res);
  }
};

const create = async (req: Request, res: Response) => {
  const product = req.body as CreateProductDto;
  try {
    const newProduct = await createProduct(product);
    res.status(StatusCodes.CREATED).json(newProduct);
  } catch (err) {
    productErrors(err, res);
  }
};

const read = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  try {
    const product = await getProduct(id);
    res.status(StatusCodes.OK).json(product);
  } catch (err) {
    productErrors(err, res);
  }
};

const update = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const product = req.body as CreateProductDto;
  try {
    const updatedProduct = await updateProduct(id, product);
    res.status(StatusCodes.OK).json(updatedProduct);
  } catch (err) {
    productErrors(err, res);
  }
};

const remove = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  try {
    const deletedProduct = await removeProduct(id);
    res.status(StatusCodes.OK).json(deletedProduct);
  } catch (err) {
    productErrors(err, res);
  }
};

export default { index, create, read, update, remove };

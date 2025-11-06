// define os tipos de dados que serão usados no recurso de produtos
import { Product } from "@prisma/client";

// DTO - Data Transfer Object
export type CreateProductDTO = Pick<
  Product,
  "name" | "price" | "stockQuantity"
>;
export type UpdateProductDTO = Pick<
  Product,
  "name" | "price" | "stockQuantity"
>;

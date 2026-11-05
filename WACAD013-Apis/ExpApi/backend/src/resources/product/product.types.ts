import { type Product } from "../../generated/prisma/client.js";

export type CreateProductDto = Pick<Product, "name" | "price" | "stock">;
export type UpdateProductDto = Partial<CreateProductDto>;

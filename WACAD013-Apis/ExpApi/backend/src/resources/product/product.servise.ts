import { type Product } from "../../generated/prisma/client.js";
import { prisma } from "../../utils/prismaClient.js";
import type { CreateProductDto, UpdateProductDto } from "./product.types.js";

export async function getProducts(): Promise<Product[]> {
  return prisma.product.findMany();
}

export async function createProduct(data: CreateProductDto): Promise<Product> {
  return prisma.product.create({ data });
}

export async function getProduct(id: string): Promise<Product | null> {
  return prisma.product.findFirst({ where: { id } });
}

// Novos métodos:
export async function updateProduct(
  id: string,
  data: UpdateProductDto,
): Promise<Product> {
  return prisma.product.update({
    where: { id },
    data,
  });
}

export async function deleteProduct(id: string): Promise<Product> {
  return prisma.product.delete({
    where: { id },
  });
}

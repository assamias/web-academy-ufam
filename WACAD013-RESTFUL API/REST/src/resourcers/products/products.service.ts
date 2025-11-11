// Funções que vão se comunicar com o banco de dados
import { PrismaClient, Product } from "@prisma/client";
import { CreateProductDTO } from "./products.types";

const prisma = new PrismaClient();

export function getProduct(id: string): Promise<Product | null> {
  return prisma.product.findUnique({ where: { id: id } });
}

export function productAlreadyExists(name: string): Promise<Product | null> {
  return prisma.product.findFirst({ where: { name: name } });
}

export function getAllProducts(): Promise<Product[]> {
  return prisma.product.findMany();
}

export function createProduct(
  createProduct: CreateProductDTO
): Promise<Product> {
  return prisma.product.create({
    data: createProduct,
  });
}

export function updateProduct(
  id: string,
  data: Partial<CreateProductDTO>
): Promise<Product> {
  return prisma.product.update({
    where: { id: id },
    data: data,
  });
}

export function deleteProduct(id: string): Promise<Product> {
  return prisma.product.delete({
    where: { id: id },
  });
}

import { PrismaClient, Purchase, PurchaseItem } from "@prisma/client";
import { CartItem } from "./purchaseItens.types";

const prisma = new PrismaClient();

export async function getProductPriceAndStock(
  productId: string
): Promise<{ price: number; stock: number } | null> {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: {
      price: true,
      stockQuantity: true,
    },
  });

  return product as { price: number; stock: number } | null;
}
export async function createPurchaseAndItems(
  userId: string,
  cart: CartItem[]
): Promise<Purchase> {
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [purchase] = await prisma.$transaction(async (tx) => {
    const newPurchase = await tx.purchase.create({
      data: {
        userId: userId,
        totalAmount: totalAmount,
      },
    });

    const itemsToCreate = [];
    const stockUpdates = [];

    for (const item of cart) {
      itemsToCreate.push({
        purchaseId: newPurchase.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.price,
      });

      stockUpdates.push(
        tx.product.update({
          where: { id: item.productId },
          data: {
            stockQuantity: {
              decrement: item.quantity,
            },
          },
        })
      );
    }
    await tx.purchaseItem.createMany({
      data: itemsToCreate as any,
    });

    await Promise.all(stockUpdates);

    return [newPurchase];
  });

  return purchase;
}

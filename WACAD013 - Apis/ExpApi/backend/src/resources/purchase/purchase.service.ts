import type { CartItem } from "./purchase.types.js"; // Use 'import type' para interfaces/tipos
import { prisma } from "../../utils/prismaClient.js";

export const createPurchase = async (userId: string, cart: CartItem[]) => {
  const compra = await prisma.purchase.create({
    data: {
      userId: userId,
      items: {
        create: cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      },
    },
  });

  return compra;
};

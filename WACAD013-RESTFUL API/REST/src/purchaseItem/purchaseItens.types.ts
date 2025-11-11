import { PurchaseItem } from "@prisma/client";

export type AddPurchaseItem = Pick<PurchaseItem, "productId" | "quantity">;

export type CartItem = AddPurchaseItem & {
  price: number;
};

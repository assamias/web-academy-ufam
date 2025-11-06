import { PurchaseItem } from "@prisma/client";

export type AddPurchaseItem = Pick<PurchaseItem, "productId" | "quantity">;

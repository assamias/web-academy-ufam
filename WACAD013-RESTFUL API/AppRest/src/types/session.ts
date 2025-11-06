import { AddPurchaseItem } from "../purchaseItem/purchaseItens.types";

declare module "express-session" {
  interface SessionData {
    uid: string;
    userTypeId: string;
    cart: AddPurchaseItem();
  }
}

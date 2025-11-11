import { CartItem } from "../purchaseItem/purchaseItens.types";

declare module "express-session" {
  interface SessionData {
    uid: string | undefined;
    userTypeId: string | undefined;
    cart: CartItem[];
  }
}

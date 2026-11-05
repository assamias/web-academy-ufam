import "express-session";

export interface CartItem {
  productId: string;
  quantity: number;
}

declare module "express-session" {
  interface SessionData {
    userId?: string;
    userTypeId?: string;
    cart?: CartItem[];
  }
}

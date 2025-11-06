import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function createPurchase() {
    prisma.purchase.create({data: {
        PurchaseItem: {
            createMany:
        }
    }})
}

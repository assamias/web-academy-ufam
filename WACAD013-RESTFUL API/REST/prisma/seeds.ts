import { PrismaClient } from "@prisma/client";
import { UserTypes } from "../src/userType/userTypes.constants";

const prisma = new PrismaClient();

async function seed() {
  // dar o migrate antes de rodar o seed
  return await prisma.userType.createMany({
    data: [
      { id: UserTypes.ADMIN, label: "admin" },
      { id: UserTypes.CLIENT, label: "client" },
    ],
    skipDuplicates: true,
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });

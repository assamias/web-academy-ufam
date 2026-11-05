import { prisma } from "../src/utils/prismaClient.js";
import { UserTypes } from "../src/resources/userType/userType.constants.js";

async function seed() {
  await prisma.userType.createMany({
    data: [
      { id: UserTypes.ADMIN, label: "Admin" },
      { id: UserTypes.CLIENT, label: "Client" },
    ],
    skipDuplicates: true,
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });

import type { User } from "../../generated/prisma/client.js";
import { prisma } from "../../utils/prismaClient.js";
import type { LoginDto } from "./auth.types.js";
import { compare } from "bcryptjs";

export async function checkCredentials(data: LoginDto): Promise<User | null> {
  const user = await prisma.user.findFirst({ where: { email: data.email } });
  const ok = await compare(data.password, user ? user.password : "FAKEHASH");
  return ok ? user : null;
}

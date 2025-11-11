import { Login } from "./auth.types";
import { getUserByEmail } from "../users/usersService";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function checkCredentials(
  credentials: Login
): Promise<User | null> {
  const user = await getUserByEmail(credentials.email);

  if (!user) {
    return null;
  }

  const ok = await bcrypt.compare(credentials.password, user.password);

  return ok ? user : null;
}

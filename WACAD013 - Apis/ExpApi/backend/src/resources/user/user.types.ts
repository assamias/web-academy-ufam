import type { User } from "../../generated/prisma/client.js";

export type CreateUserDto = Pick<
  User,
  "name" | "email" | "password" | "userTypeId"
>;

export type UserDto = Omit<User, "password">;

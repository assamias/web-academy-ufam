import { User } from "@prisma/client";

export type CreateUserDTO = Pick<
  User,
  "name" | "email" | "password" | "userTypeId"
>;
export type UpdateUserDTO = Partial<CreateUserDTO>;

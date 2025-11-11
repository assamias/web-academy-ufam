import { User } from "@prisma/client";

export type CreateUserDTO = Pick<
  User,
  "name" | "email" | "password" | "userTypeId"
>;
export type UpdateUserDTO = Partial<CreateUserDTO>;
// a omissão da senha é essencial para que ela não seja retornada em caso de acesso
export type UserResponseDTO = Omit<User, "password">;

import { User } from "@prisma/client";

export type SignUp = Pick<User, "name" | "email" | "password">;
export type Login = Pick<User, "email" | "password">;

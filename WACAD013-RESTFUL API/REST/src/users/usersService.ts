import { PrismaClient, User } from "@prisma/client";
import { UserTypes } from "../userType/userTypes.constants";
import { CreateUserDTO, UpdateUserDTO, UserResponseDTO } from "./usersType";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

export async function createUser(createUser: CreateUserDTO): Promise<User> {
  const { password } = createUser;
  const rounds = parseInt(process.env.HASH_SALT_ROUNDS as string);

  const salt = await bcrypt.genSalt(rounds);
  const hash = await bcrypt.hash(password, salt);

  return prisma.user.create({
    data: {
      ...createUser,
      password: hash,
    },
  });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function getAllUsers(): Promise<UserResponseDTO[]> {
  // 💡 Recomendação: Use o 'select' para evitar retornar a senha (hash)
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      userTypeId: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}
export async function getUserById(id: string): Promise<UserResponseDTO | null> {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      userTypeId: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}
export async function updateUser(
  id: string,
  updateData: UpdateUserDTO
): Promise<User> {
  const data: any = { ...updateData };
  if (data.password) {
    const rounds = parseInt((process.env.HASH_SALT_ROUNDS as string) || "10");
    const salt = await bcrypt.genSalt(rounds);
    data.password = await bcrypt.hash(data.password, salt);
  }
  // O Prisma lança o erro P2025 (registro não encontrado) se o ID não existir.
  return prisma.user.update({
    where: { id },
    data: data,
  });
}
export async function deleteUser(id: string): Promise<void> {
  // O Prisma lança o erro P2025 se o ID não existir.
  await prisma.user.delete({
    where: { id },
  });
}

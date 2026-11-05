import { genSalt, hash } from "bcryptjs";
import { prisma } from "../../utils/prismaClient.js";
import type { CreateUserDto, UserDto } from "./user.types.js";
import getEnv from "../../utils/validateEnv.js";
import { UserTypes } from "../userType/userType.constants.js";

const env = getEnv();

export async function getUsers(): Promise<UserDto[]> {
  const users = await prisma.user.findMany();

  return users.map((u) => {
    const { password, ...user } = u;
    return user;
  });
}

export async function findByEmail(email: string): Promise<UserDto | null> {
  const tempuser = await prisma.user.findFirst({
    where: { email },
  });

  if (!tempuser) return null;

  const { password, ...user } = tempuser;

  return user;
}

export async function getUser(id: string): Promise<UserDto | null> {
  const tempuser = await prisma.user.findFirst({
    where: { id },
  });

  if (!tempuser) return null;

  const { password, ...user } = tempuser;

  return user;
}

export async function createUser(data: CreateUserDto): Promise<UserDto> {
  const salt = await genSalt(Number(env.ROUNDS_BCRYPT));
  const passwordHash = await hash(data.password, salt);

  const { password, ...user } = await prisma.user.create({
    data: {
      ...data,
      password: passwordHash,
    },
  });
  return user;
}

export async function updateUser(
  id: string,
  data: CreateUserDto,
): Promise<UserDto> {
  const salt = await genSalt(Number(env.ROUNDS_BCRYPT));
  const passwordHash = await hash(data.password, salt);

  const { password, ...user } = await prisma.user.update({
    where: {
      id,
    },
    data: {
      ...data,
      password: passwordHash,
    },
  });

  return user;
}

export async function deleteUser(id: string): Promise<void> {
  await prisma.user.delete({
    where: {
      id,
    },
  });
}

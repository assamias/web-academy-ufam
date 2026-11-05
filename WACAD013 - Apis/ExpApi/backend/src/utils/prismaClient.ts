import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import getEnv from "../utils/validateEnv.js";

const env = getEnv();
const adapter = new PrismaMariaDb(env.DATABASE_URL);
export const prisma = new PrismaClient({ adapter });

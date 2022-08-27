import { PrismaClient } from "@prisma/client";

var prismaClient;

export const prisma =
  prismaClient ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") prismaClient = prisma;
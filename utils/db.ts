import { PrismaClient } from "@prisma/client/edge";

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["warn", "error"],
  });

// This is a workaround to prevent Prisma from being initialized multiple times in development
if (process.env.NODE_ENV === "development") {
  globalForPrisma.prisma = prisma;
}

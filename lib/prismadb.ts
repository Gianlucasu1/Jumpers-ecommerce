import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined
};

// avoid hard reloading the process

const prismadb = globalThis.prisma || new PrismaClient();
if(process.env.NODE_ENV !== 'production') globalThis.prisma = prismadb;

export default prismadb;
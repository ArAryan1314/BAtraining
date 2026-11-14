import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import { resolveDatabaseUrl, resolvePoolSize } from "./connection";

declare global {
  var prisma: PrismaClient | undefined;
}

const IDLE_TIMEOUT_MS = 10_000;
const CONNECT_TIMEOUT_MS = 10_000;

function createPrismaClient() {
  const adapter = new PrismaPg({
    connectionString: resolveDatabaseUrl(process.env),
    max: resolvePoolSize(process.env),
    // Release idle connections quickly so a frozen serverless instance doesn't hold them.
    idleTimeoutMillis: IDLE_TIMEOUT_MS,
    connectionTimeoutMillis: CONNECT_TIMEOUT_MS,
  });
  return new PrismaClient({ adapter });
}

export const prisma = globalThis.prisma ?? createPrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

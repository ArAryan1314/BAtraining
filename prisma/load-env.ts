import { loadEnvConfig } from "@next/env";

// Gives Prisma tooling the same .env.local / .env files that Next.js reads.
loadEnvConfig(process.cwd());

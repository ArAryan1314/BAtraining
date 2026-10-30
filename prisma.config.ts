import { defineConfig } from "prisma/config";
import "./prisma/load-env";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations", seed: "tsx prisma/seed.ts" },
  // Empty rather than required so `prisma generate` works without a database (CI, postinstall).
  datasource: { url: process.env.DATABASE_URL ?? "" },
});

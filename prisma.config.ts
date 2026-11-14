import { defineConfig } from "prisma/config";
import "./prisma/load-env";
import { resolveDirectUrl } from "./lib/db/connection";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations", seed: "tsx prisma/seed.ts" },
  // The CLI migrates over the direct connection. Empty rather than required so `prisma generate` works without a database (CI, postinstall).
  datasource: { url: resolveDirectUrl(process.env) ?? "" },
});

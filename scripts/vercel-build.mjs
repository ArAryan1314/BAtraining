import { spawnSync } from "node:child_process";

/**
 * Vercel build: generate the client, apply pending migrations on production deployments only, then build.
 * Preview deployments never migrate, so a pull request can't change the production schema.
 */
function run(command, args) {
  const result = spawnSync(command, args, { stdio: "inherit", shell: process.platform === "win32" });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run("pnpm", ["exec", "prisma", "generate"]);
if (process.env.VERCEL_ENV === "production") {
  console.log("Production deploy: applying pending database migrations.");
  run("pnpm", ["exec", "prisma", "migrate", "deploy"]);
} else {
  console.log(`Skipping migrations (VERCEL_ENV=${process.env.VERCEL_ENV ?? "unset"}).`);
}
run("pnpm", ["exec", "next", "build"]);

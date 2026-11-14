/** Runs once at server start, so a misconfigured deployment fails immediately instead of on the first request. */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs" || process.env.NEXT_PHASE === "phase-production-build") return;
  const { parseEnv } = await import("@/lib/env");
  parseEnv(process.env);
}

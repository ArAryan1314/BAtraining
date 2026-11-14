/**
 * Runs once at server start and logs every configuration problem. It deliberately doesn't throw: a throw here turns
 * every server-rendered page into an unexplained 500. Instead /api/health reports the same problems, and the
 * features that need the missing setting fail on their own.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs" || process.env.NEXT_PHASE === "phase-production-build") return;
  const { envProblems } = await import("@/lib/env");
  const problems = envProblems(process.env);
  if (problems.length) console.error(`Invalid environment configuration:\n${problems.map((problem) => `  - ${problem}`).join("\n")}`);
}

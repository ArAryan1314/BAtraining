import { envProblems } from "@/lib/env";

/**
 * True when sign-in can't work on this server because a setting it depends on (the session secret or the database)
 * is missing. Lets the sign-in page explain itself instead of failing with a bare 500.
 */
export function signInUnavailable(env: Record<string, string | undefined>): boolean {
  return envProblems(env).some((problem) => problem.startsWith("AUTH_SECRET") || problem.startsWith("DATABASE_URL"));
}

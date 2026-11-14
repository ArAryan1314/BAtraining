import { z } from "zod";
import { integrationEnvKeys } from "@/config/integrations";
import { resolveDatabaseUrl } from "@/lib/db/connection";

const optional = z.string().trim().optional().transform((value) => value || undefined);

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: optional,
  DATABASE_POOL_MAX: optional,
  AUTH_SECRET: z.string({ error: "AUTH_SECRET is not set." }).min(16, "AUTH_SECRET must be at least 16 characters. Generate one with: openssl rand -base64 32"),
  NEXTAUTH_URL: optional,
  // Provider credentials are optional at parse time; config/integrations.ts says which are required to launch.
  ...Object.fromEntries(integrationEnvKeys.map((key) => [key, optional])),
});

export type Env = z.infer<typeof envSchema> & Record<string, string | undefined>;
type Source = Record<string, string | undefined>;

const PLACEHOLDER_SECRET = "replace-with-a-long-random-secret";

/**
 * Everything wrong with the configuration, as plain sentences that name a setting but never print its value.
 * Safe to show on the health endpoint.
 */
export function envProblems(source: Source): string[] {
  const problems: string[] = [];
  const result = envSchema.safeParse(source);
  if (!result.success) problems.push(...result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`));
  if (!resolveDatabaseUrl(source)) {
    problems.push("DATABASE_URL: set a postgres:// connection string (or POSTGRES_URL from Vercel). prisma+postgres:// URLs are not supported by this client.");
  }
  if (source.NODE_ENV === "production") {
    if (source.AUTH_SECRET === PLACEHOLDER_SECRET) problems.push("AUTH_SECRET is still the placeholder value from .env.example.");
    // On Vercel, NextAuth derives the site URL itself, so NEXTAUTH_URL is optional there. When it is set it must be https.
    const nextAuthUrl = source.NEXTAUTH_URL?.trim();
    if (nextAuthUrl ? !nextAuthUrl.startsWith("https://") : !source.VERCEL) problems.push("NEXTAUTH_URL must be an https:// URL in production.");
  }
  return problems;
}

/** Parses the environment and throws, listing every problem at once, when a required value is missing or still a placeholder. */
export function parseEnv(source: Source): Env {
  const problems = envProblems(source);
  if (problems.length) throw new Error(`Invalid environment configuration:\n${problems.map((problem) => `  - ${problem}`).join("\n")}`);
  return envSchema.parse(source) as Env;
}

import { z } from "zod";
import { integrationEnvKeys } from "@/config/integrations";

const optional = z.string().trim().optional().transform((value) => value || undefined);

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required."),
  AUTH_SECRET: z.string().min(16, "AUTH_SECRET must be at least 16 characters. Generate one with: openssl rand -base64 32"),
  NEXTAUTH_URL: optional,
  // Provider credentials are optional at parse time; config/integrations.ts says which are required to launch.
  ...Object.fromEntries(integrationEnvKeys.map((key) => [key, optional])),
});

export type Env = z.infer<typeof envSchema> & Record<string, string | undefined>;

const PLACEHOLDER_SECRET = "replace-with-a-long-random-secret";

/** Parses the environment and refuses to continue when a required value is missing or still a placeholder. */
export function parseEnv(source: Record<string, string | undefined>): Env {
  const result = envSchema.safeParse(source);
  if (!result.success) {
    const problems = result.error.issues.map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`).join("\n");
    throw new Error(`Invalid environment configuration:\n${problems}`);
  }
  const env = result.data as Env;
  if (env.NODE_ENV === "production") {
    if (env.AUTH_SECRET === PLACEHOLDER_SECRET) throw new Error("AUTH_SECRET is still the placeholder value from .env.example.");
    if (!env.NEXTAUTH_URL?.startsWith("https://")) throw new Error("NEXTAUTH_URL must be an https:// URL in production.");
  }
  return env;
}

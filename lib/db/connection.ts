type Env = Record<string, string | undefined>;

/**
 * Vercel's database integrations name their variables differently (Neon, Vercel Postgres, Prisma Postgres, or a
 * hand-set DATABASE_URL). The first standard postgres:// URL in each list wins.
 * `prisma+postgres://` URLs are skipped: they belong to the Prisma Accelerate client, not the pg driver used here.
 */
const POOLED_KEYS = ["DATABASE_URL", "POSTGRES_PRISMA_URL", "POSTGRES_URL"] as const;
const DIRECT_KEYS = ["DIRECT_URL", "DATABASE_URL_UNPOOLED", "POSTGRES_URL_NON_POOLING"] as const;

const DEFAULT_POOL_SIZE = 5;
const MAX_POOL_SIZE = 50;

const isPostgresUrl = (value: string | undefined): value is string => Boolean(value && /^postgres(ql)?:\/\//.test(value));
const firstPostgresUrl = (env: Env, keys: readonly string[]) => keys.map((key) => env[key]).find(isPostgresUrl);

/** The connection the running app uses. Prefer the pooled URL, so serverless instances don't exhaust database connections. */
export const resolveDatabaseUrl = (env: Env) => firstPostgresUrl(env, POOLED_KEYS);

/** The connection for migrations and `db push`. They need a direct connection, because a pooler can't run schema changes safely. */
export const resolveDirectUrl = (env: Env) => firstPostgresUrl(env, DIRECT_KEYS) ?? resolveDatabaseUrl(env);

/** Connections each server instance may hold. Keep it small on serverless: many instances share the database's limit. */
export function resolvePoolSize(env: Env): number {
  const requested = Number.parseInt(env.DATABASE_POOL_MAX ?? "", 10);
  return Number.isInteger(requested) && requested > 0 ? Math.min(requested, MAX_POOL_SIZE) : DEFAULT_POOL_SIZE;
}

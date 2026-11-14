import assert from "node:assert/strict";
import { test } from "node:test";
import { resolveDatabaseUrl, resolveDirectUrl, resolvePoolSize } from "@/lib/db/connection";

const pooled = "postgresql://u:p@pooler.example/db?sslmode=require";
const direct = "postgresql://u:p@direct.example/db?sslmode=require";

test("the app uses the pooled url, trying Vercel's variable names in order", () => {
  assert.equal(resolveDatabaseUrl({ DATABASE_URL: pooled, POSTGRES_URL: "postgres://other" }), pooled);
  assert.equal(resolveDatabaseUrl({ POSTGRES_PRISMA_URL: pooled }), pooled);
  assert.equal(resolveDatabaseUrl({ POSTGRES_URL: pooled }), pooled);
  assert.equal(resolveDatabaseUrl({}), undefined);
});

test("prisma+postgres:// urls are skipped in favour of a standard one", () => {
  assert.equal(resolveDatabaseUrl({ DATABASE_URL: "prisma+postgres://accelerate.example/?api_key=x", POSTGRES_URL: pooled }), pooled);
  assert.equal(resolveDatabaseUrl({ DATABASE_URL: "prisma+postgres://accelerate.example/?api_key=x" }), undefined);
});

test("migrations use the direct url and fall back to the pooled one", () => {
  assert.equal(resolveDirectUrl({ DATABASE_URL: pooled, DIRECT_URL: direct }), direct);
  assert.equal(resolveDirectUrl({ DATABASE_URL: pooled, POSTGRES_URL_NON_POOLING: direct }), direct);
  assert.equal(resolveDirectUrl({ DATABASE_URL: pooled }), pooled);
});

test("pool size defaults to 5 and is bounded", () => {
  assert.equal(resolvePoolSize({}), 5);
  assert.equal(resolvePoolSize({ DATABASE_POOL_MAX: "2" }), 2);
  assert.equal(resolvePoolSize({ DATABASE_POOL_MAX: "9999" }), 50);
  assert.equal(resolvePoolSize({ DATABASE_POOL_MAX: "abc" }), 5);
});

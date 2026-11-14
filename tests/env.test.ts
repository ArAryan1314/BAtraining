import assert from "node:assert/strict";
import { test } from "node:test";
import { envProblems, parseEnv } from "@/lib/env";

const valid = { DATABASE_URL: "postgresql://localhost/db", AUTH_SECRET: "a-sufficiently-long-secret-value", NODE_ENV: "development" };

test("a complete environment parses", () => {
  assert.equal(parseEnv(valid).DATABASE_URL, valid.DATABASE_URL);
});

test("missing or short required values are reported", () => {
  assert.throws(() => parseEnv({ ...valid, DATABASE_URL: undefined }), /DATABASE_URL/);
  assert.throws(() => parseEnv({ ...valid, AUTH_SECRET: "short" }), /AUTH_SECRET/);
});

test("production rejects the placeholder secret and a non-https URL", () => {
  const production = { ...valid, NODE_ENV: "production", NEXTAUTH_URL: "https://example.com" };
  assert.ok(parseEnv(production));
  assert.throws(() => parseEnv({ ...production, AUTH_SECRET: "replace-with-a-long-random-secret" }), /placeholder/);
  assert.throws(() => parseEnv({ ...production, NEXTAUTH_URL: "http://example.com" }), /https/);
});

test("blank optional values are treated as unset", () => {
  assert.equal(parseEnv({ ...valid, EMAIL_PROVIDER_API_KEY: "  " }).EMAIL_PROVIDER_API_KEY, undefined);
});

test("on Vercel, NEXTAUTH_URL may be left unset, but must be https when given", () => {
  const onVercel = { ...valid, NODE_ENV: "production", VERCEL: "1" };
  assert.ok(parseEnv(onVercel));
  assert.ok(parseEnv({ ...onVercel, NEXTAUTH_URL: "https://batraining.vercel.app" }));
  assert.throws(() => parseEnv({ ...onVercel, NEXTAUTH_URL: "http://batraining.vercel.app" }), /https/);
});

test("DATABASE_URL may come from Vercel's POSTGRES_URL", () => {
  assert.ok(parseEnv({ ...valid, DATABASE_URL: undefined, POSTGRES_URL: "postgresql://u:p@host/db" }));
});

test("envProblems lists every problem at once and never echoes a value", () => {
  const problems = envProblems({ NODE_ENV: "production", AUTH_SECRET: "short-secret-value-123", VERCEL: "1" });
  assert.ok(problems.some((problem) => problem.includes("DATABASE_URL")));
  assert.ok(!problems.some((problem) => problem.includes("short-secret-value-123")));
  const none = envProblems({});
  assert.ok(none.some((problem) => problem.includes("AUTH_SECRET is not set")));
  assert.ok(none.some((problem) => problem.includes("DATABASE_URL")));
  assert.deepEqual(envProblems({ ...valid, NODE_ENV: "production", VERCEL: "1" }), []);
});

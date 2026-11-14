import assert from "node:assert/strict";
import { test } from "node:test";
import { signInUnavailable } from "@/lib/auth/availability";

const configured = { DATABASE_URL: "postgresql://u:p@host/db", AUTH_SECRET: "a-sufficiently-long-secret-value" };

test("sign-in is available when the secret and database are set", () => {
  assert.equal(signInUnavailable(configured), false);
});

test("sign-in is unavailable without the secret or a database url", () => {
  assert.equal(signInUnavailable({ ...configured, AUTH_SECRET: undefined }), true);
  assert.equal(signInUnavailable({ ...configured, DATABASE_URL: undefined }), true);
  assert.equal(signInUnavailable({ ...configured, AUTH_SECRET: "short" }), true);
});

test("an unrelated problem does not block sign-in", () => {
  assert.equal(signInUnavailable({ ...configured, NODE_ENV: "production", NEXTAUTH_URL: "http://insecure.example", VERCEL: "1" }), false);
});

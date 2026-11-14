import assert from "node:assert/strict";
import { test } from "node:test";
import { parseFirstAdmin } from "@/lib/auth/first-admin";

const good = { ADMIN_EMAIL: "  Owner@Example.com ", ADMIN_PASSWORD: "a-long-random-passphrase-91" };

test("reads and normalises the admin details", () => {
  const admin = parseFirstAdmin(good);
  assert.equal(admin.email, "owner@example.com");
  assert.equal(admin.name, "Platform Admin");
  assert.equal(parseFirstAdmin({ ...good, ADMIN_NAME: "Priya" }).name, "Priya");
});

test("a missing email or password is reported by name", () => {
  assert.throws(() => parseFirstAdmin({ ADMIN_PASSWORD: good.ADMIN_PASSWORD }), /ADMIN_EMAIL/);
  assert.throws(() => parseFirstAdmin({ ADMIN_EMAIL: good.ADMIN_EMAIL }), /ADMIN_PASSWORD/);
});

test("weak passwords are rejected without echoing them", () => {
  assert.throws(() => parseFirstAdmin({ ...good, ADMIN_PASSWORD: "short" }), (error: Error) => !error.message.includes("short") || /at least/.test(error.message));
  assert.throws(() => parseFirstAdmin({ ...good, ADMIN_PASSWORD: "Password12345" }), /easy to guess/);
  assert.throws(() => parseFirstAdmin({ ...good, ADMIN_PASSWORD: "ChangeMe123!" }), /easy to guess/);
});

test("an invalid email is rejected", () => {
  assert.throws(() => parseFirstAdmin({ ...good, ADMIN_EMAIL: "not-an-email" }), /email/i);
});

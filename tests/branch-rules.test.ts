import assert from "node:assert/strict";
import { test } from "node:test";
import { branchProblems as problems } from "../scripts/branch-rules.mjs";

test("feature and bugfix branches go into development", () => {
  assert.deepEqual(problems("feature/student-notes", "development"), []);
  assert.deepEqual(problems("bugfix/login-redirect", "development"), []);
  assert.ok(problems("feature/student-notes", "main").length > 0);
  assert.ok(problems("bugfix/login-redirect", "main").length > 0);
});

test("release and hotfix branches go into main", () => {
  assert.deepEqual(problems("release/1.3.0", "main"), []);
  assert.deepEqual(problems("hotfix/session-crash", "main"), []);
  assert.ok(problems("release/1.3.0", "development").length > 0);
  assert.ok(problems("hotfix/session-crash", "development").length > 0);
});

test("release branches need a version number", () => {
  assert.ok(problems("release/next", "main").length > 0);
  assert.ok(problems("release/1.3", "main").length > 0);
});

test("dependabot branches are allowed into development only", () => {
  assert.deepEqual(problems("dependabot/npm_and_yarn/next-16.5.0", "development"), []);
  assert.ok(problems("dependabot/npm_and_yarn/next-16.5.0", "main").length > 0);
});

test("long-lived branches and badly named branches are rejected", () => {
  assert.ok(problems("development", "main").length > 0);
  assert.ok(problems("main", "development").length > 0);
  assert.ok(problems("fix/something", "development").length > 0);
  assert.ok(problems("feature/Has Spaces", "development").length > 0);
  assert.ok(problems("random-branch", "development").length > 0);
});

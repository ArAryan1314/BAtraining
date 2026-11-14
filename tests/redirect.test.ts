import assert from "node:assert/strict";
import { test } from "node:test";
import { postSignInPath } from "@/lib/auth/redirect";

test("returns to the requested page inside the user's own workspace", () => {
  assert.equal(postSignInPath("STUDENT", "/student/courses?x=1"), "/student/courses?x=1");
  assert.equal(postSignInPath("ADMIN", "/admin/users"), "/admin/users");
});

test("falls back to the workspace home for anything else", () => {
  assert.equal(postSignInPath("STUDENT", null), "/student/dashboard");
  assert.equal(postSignInPath("STUDENT", "/admin/users"), "/student/dashboard");
  assert.equal(postSignInPath("STUDENT", "https://evil.example"), "/student/dashboard");
  assert.equal(postSignInPath("STUDENT", "//evil.example"), "/student/dashboard");
  assert.equal(postSignInPath("STUDENT", "/\\evil.example"), "/student/dashboard");
  assert.equal(postSignInPath("STUDENT", "/studentx/y"), "/student/dashboard");
});

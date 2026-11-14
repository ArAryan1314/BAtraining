import assert from "node:assert/strict";
import { test } from "node:test";
import { permissions } from "@/config/permissions";
import { can, canAll, canAny } from "@/lib/permissions";

test("students never hold write or management permissions", () => {
  const privileged = permissions.STUDENT.filter((permission) => /\.(manage|publish|revoke|issue|grade|review|write)$/.test(permission) && !permission.startsWith("portfolio") && permission !== "progress.write");
  assert.deepEqual(privileged, []);
});

test("only admins can publish, manage payments or revoke certificates", () => {
  for (const permission of ["courses.publish", "payments.manage", "certificates.revoke", "users.write"] as const) {
    assert.equal(can("ADMIN", permission), true);
    assert.equal(can("TRAINER", permission), false);
    assert.equal(can("STUDENT", permission), false);
  }
});

test("canAll and canAny combine permissions", () => {
  assert.equal(canAll("TRAINER", ["courses.read", "assignments.grade"]), true);
  assert.equal(canAll("TRAINER", ["courses.read", "payments.manage"]), false);
  assert.equal(canAny("STUDENT", ["payments.manage", "courses.read"]), true);
});

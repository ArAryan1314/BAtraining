import assert from "node:assert/strict";
import { test } from "node:test";
import { requirePermission, requireRole, requireSelfOrPermission, type SessionUser } from "@/lib/auth/guards";
import type { UserRole } from "@/types/user";

const user = (role: UserRole, id: string = role): SessionUser => ({ id, role, name: role, email: `${role}@example.com` });

test("signed-out users are rejected", () => {
  assert.throws(() => requirePermission(null, "courses.read"), /UNAUTHENTICATED/);
  assert.throws(() => requireRole(null, ["ADMIN"]), /UNAUTHENTICATED/);
});

test("permissions follow the role", () => {
  assert.throws(() => requirePermission(user("STUDENT"), "payments.manage"), /FORBIDDEN/);
  assert.throws(() => requirePermission(user("TRAINER"), "courses.publish"), /FORBIDDEN/);
  assert.ok(requirePermission(user("ADMIN"), "courses.publish"));
  assert.ok(requirePermission(user("STUDENT"), "progress.write"));
});

test("a student can reach their own records but not another student's", () => {
  assert.ok(requireSelfOrPermission(user("STUDENT", "a"), "a", "students.read"));
  assert.throws(() => requireSelfOrPermission(user("STUDENT", "a"), "b", "students.read"), /FORBIDDEN/);
  assert.ok(requireSelfOrPermission(user("TRAINER", "t"), "b", "students.read"));
});

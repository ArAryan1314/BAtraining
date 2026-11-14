import assert from "node:assert/strict";
import { test } from "node:test";
import { FailureLimiter } from "@/lib/security/rate-limit";

test("blocks a key after the limit and frees it when the window passes", () => {
  let now = 0;
  const limiter = new FailureLimiter({ limit: 3, windowMs: 1000 }, () => now);
  for (let i = 0; i < 2; i++) limiter.recordFailure("a");
  assert.equal(limiter.isBlocked("a"), false);
  limiter.recordFailure("a");
  assert.equal(limiter.isBlocked("a"), true);
  assert.equal(limiter.isBlocked("b"), false);
  now = 1001;
  assert.equal(limiter.isBlocked("a"), false);
});

test("reset clears the failures", () => {
  const limiter = new FailureLimiter({ limit: 1, windowMs: 1000 });
  limiter.recordFailure("a");
  limiter.reset("a");
  assert.equal(limiter.isBlocked("a"), false);
});

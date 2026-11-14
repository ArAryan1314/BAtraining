import assert from "node:assert/strict";
import { test } from "node:test";
import { securityHeaders } from "@/lib/security/headers";

test("the policy forbids framing, plugins and foreign form targets", () => {
  const csp = securityHeaders["Content-Security-Policy"];
  for (const directive of ["frame-ancestors 'none'", "object-src 'none'", "base-uri 'self'", "form-action 'self'"]) assert.ok(csp.includes(directive), directive);
});

test("transport and sniffing protections are set", () => {
  assert.match(securityHeaders["Strict-Transport-Security"], /max-age=\d+/);
  assert.equal(securityHeaders["X-Content-Type-Options"], "nosniff");
});

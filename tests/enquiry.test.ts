import assert from "node:assert/strict";
import { test } from "node:test";
import { enquiryInterests } from "@/config/enquiry";
import { can } from "@/lib/permissions";
import { enquiryInputSchema, enquiryStatusSchema } from "@/lib/validations/domain";

const good = { name: "  Jordan Lee ", email: " Jordan@Example.COM ", interest: enquiryInterests[0], message: "I work in QA and want to move into business analysis." };

test("a valid enquiry is trimmed and normalised", () => {
  const enquiry = enquiryInputSchema.parse(good);
  assert.equal(enquiry.name, "Jordan Lee");
  assert.equal(enquiry.email, "jordan@example.com");
  assert.equal(enquiry.role, undefined);
});

test("the role is optional but kept when given", () => {
  assert.equal(enquiryInputSchema.parse({ ...good, role: " QA engineer " }).role, "QA engineer");
});

test("bad enquiries are rejected with a readable message", () => {
  const message = (input: object) => {
    const result = enquiryInputSchema.safeParse({ ...good, ...input });
    return result.success ? null : result.error.issues[0].message;
  };
  assert.match(message({ email: "not-an-email" }) ?? "", /valid email/);
  assert.match(message({ name: "   " }) ?? "", /name is required/i);
  assert.match(message({ message: "hi" }) ?? "", /a little more/);
  assert.match(message({ interest: "Free iPhone" }) ?? "", /interested in/);
});

test("an overlong message is rejected", () => {
  assert.equal(enquiryInputSchema.safeParse({ ...good, message: "x".repeat(5_001) }).success, false);
});

test("only the known statuses are accepted", () => {
  assert.ok(enquiryStatusSchema.safeParse({ enquiryId: "e1", status: "CONTACTED" }).success);
  assert.equal(enquiryStatusSchema.safeParse({ enquiryId: "e1", status: "ARCHIVED" }).success, false);
  assert.equal(enquiryStatusSchema.safeParse({ enquiryId: "", status: "NEW" }).success, false);
});

test("only admins can read or manage enquiries", () => {
  for (const permission of ["enquiries.read", "enquiries.write"] as const) {
    assert.equal(can("ADMIN", permission), true);
    assert.equal(can("TRAINER", permission), false);
    assert.equal(can("STUDENT", permission), false);
  }
});

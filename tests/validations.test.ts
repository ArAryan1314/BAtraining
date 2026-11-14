import assert from "node:assert/strict";
import { test } from "node:test";
import { assignmentSubmissionSchema, paymentInputSchema, questionInputSchema, userInputSchema, webUrlSchema } from "@/lib/validations/domain";

test("only http(s) links are accepted for learner-facing URLs", () => {
  assert.ok(webUrlSchema.safeParse("https://example.com/video").success);
  assert.equal(webUrlSchema.safeParse("javascript:alert(1)").success, false);
  assert.equal(webUrlSchema.safeParse("data:text/html,x").success, false);
});

test("a quiz question's answer must be one of its options", () => {
  const base = { quizId: "q", prompt: "Pick one", points: "2" };
  assert.ok(questionInputSchema.safeParse({ ...base, options: "A\nB", answer: "A" }).success);
  assert.equal(questionInputSchema.safeParse({ ...base, options: "A\nB", answer: "C" }).success, false);
  assert.equal(questionInputSchema.safeParse({ ...base, options: "A", answer: "A" }).success, false);
});

test("emails are normalised and weak passwords rejected", () => {
  const parsed = userInputSchema.parse({ name: "Sam", email: "  Sam@Example.COM ", role: "STUDENT", password: "long-enough-pass" });
  assert.equal(parsed.email, "sam@example.com");
  assert.equal(userInputSchema.safeParse({ name: "Sam", email: "sam@example.com", role: "STUDENT", password: "short" }).success, false);
});

test("payment amounts allow at most two decimals", () => {
  assert.ok(paymentInputSchema.safeParse({ studentId: "s", amount: "4999.50" }).success);
  assert.equal(paymentInputSchema.safeParse({ studentId: "s", amount: "49.999" }).success, false);
  assert.equal(paymentInputSchema.safeParse({ studentId: "s", amount: "-5" }).success, false);
});

test("blank submissions are rejected", () => {
  assert.equal(assignmentSubmissionSchema.safeParse({ assignmentId: "a", content: "   " }).success, false);
});

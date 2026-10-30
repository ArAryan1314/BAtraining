import assert from "node:assert/strict";
import { test } from "node:test";
import { calculateProgress } from "@/lib/progress/calculate";
import { calculateStreak } from "@/lib/progress/streak";

const empty = { lessonsCompleted: 0, lessonsTotal: 0, assignmentsCompleted: 0, assignmentsTotal: 0, milestonesCompleted: 0, milestonesTotal: 0, quizAverage: null };

test("a course with only lessons reaches 100 when they are all done", () => {
  assert.equal(calculateProgress({ ...empty, lessonsCompleted: 4, lessonsTotal: 4 }), 100);
  assert.equal(calculateProgress({ ...empty, lessonsCompleted: 2, lessonsTotal: 4 }), 50);
});

test("an empty course is 0, not NaN", () => {
  assert.equal(calculateProgress(empty), 0);
});

test("quizzes count only when the course has them", () => {
  assert.equal(calculateProgress({ ...empty, lessonsCompleted: 4, lessonsTotal: 4, quizAverage: 50 }), 83);
  assert.equal(calculateProgress({ ...empty, lessonsCompleted: 4, lessonsTotal: 4, quizAverage: 0 }), 67);
});

const now = new Date("2026-06-10T12:00:00Z");
const daysAgo = (days: number) => new Date(now.getTime() - days * 86_400_000);

test("streak counts consecutive days ending today or yesterday", () => {
  assert.equal(calculateStreak([], now), 0);
  assert.equal(calculateStreak([daysAgo(0), daysAgo(1), daysAgo(2)], now), 3);
  assert.equal(calculateStreak([daysAgo(1), daysAgo(2)], now), 2);
  assert.equal(calculateStreak([daysAgo(2), daysAgo(3)], now), 0);
  assert.equal(calculateStreak([daysAgo(0), daysAgo(0), daysAgo(2)], now), 1);
});

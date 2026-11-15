import assert from "node:assert/strict";
import { test } from "node:test";
import { activityGrid, bucketByDay, daysSince, funnel, histogram, riskOf, sumByDay, trend } from "@/lib/analytics/series";

const now = new Date("2026-11-15T10:00:00Z");
const daysAgo = (n: number) => new Date(now.getTime() - n * 86_400_000);

test("bucketByDay puts today last and ignores anything outside the window", () => {
  assert.deepEqual(bucketByDay([daysAgo(0), daysAgo(0), daysAgo(2), daysAgo(9), new Date(now.getTime() + 86_400_000 * 3)], 4, now), [0, 1, 0, 2]);
});

test("sumByDay adds values", () => {
  assert.deepEqual(sumByDay([{ at: daysAgo(0), value: 10 }, { at: daysAgo(0), value: 5 }, { at: daysAgo(1), value: 1 }], 3, now), [0, 1, 15]);
});

test("trend compares the last window with the one before, and has no change when there was nothing before", () => {
  assert.deepEqual(trend([1, 1, 1, 2, 2, 2], 3), { current: 6, previous: 3, change: 100 });
  assert.equal(trend([0, 0, 0, 4, 4, 4], 3).change, null);
  assert.equal(trend([4, 4, 4, 2, 2, 2], 3).change, -50);
});

test("histogram buckets values and includes the top edge in the last bucket", () => {
  assert.deepEqual(histogram([0, 39, 40, 79, 80, 100, 101], [0, 40, 80, 100]), [
    { label: "0–39", count: 2 },
    { label: "40–79", count: 2 },
    { label: "80–100", count: 2 },
  ]);
});

test("funnel gives each stage its share of the first and of the stage before", () => {
  const stages = funnel([{ label: "a", count: 200 }, { label: "b", count: 100 }, { label: "c", count: 25 }]);
  assert.deepEqual(stages.map((s) => [s.ofFirst, s.ofPrevious]), [[100, 100], [50, 50], [13, 25]]);
  assert.deepEqual(funnel([{ label: "a", count: 0 }, { label: "b", count: 0 }]).map((s) => s.ofFirst), [0, 0]);
});

test("activityGrid pads the first week to a Monday start and shades by the busiest day", () => {
  const cells = activityGrid([daysAgo(0), daysAgo(0), daysAgo(0), daysAgo(0), daysAgo(1)], 2, now);
  const real = cells.filter((cell) => cell.day !== null);
  assert.equal(real.length, 14);
  const pad = cells.length - real.length;
  assert.equal(pad, (new Date(real[0].day as number).getUTCDay() + 6) % 7);
  assert.equal(real.at(-1)?.level, 4);
  assert.equal(real.at(-2)?.level, 1);
  assert.equal(real[0].level, 0);
});

test("riskOf and daysSince", () => {
  assert.equal(daysSince(daysAgo(3), now), 3);
  assert.deepEqual([null, 0, 4, 7].map((d) => riskOf(d)), ["inactive", "on-track", "slowing", "stalled"]);
});

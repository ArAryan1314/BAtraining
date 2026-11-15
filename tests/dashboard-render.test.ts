import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { test } from "node:test";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { TrainerDashboard } from "@/components/trainer/TrainerDashboard";
import { ColumnChart, Donut, FunnelChart, HeatCalendar, RingGauge, Sparkline } from "@/components/charts";
import { activityGrid, bucketByDay, funnel, histogram, trend } from "@/lib/analytics/series";

const now = new Date();
const dates = [0, 0, 1, 3, 3, 3, 8].map((age) => new Date(now.getTime() - age * 86_400_000));

test("the chart kit draws with real data and with none at all", () => {
  const empty = [
    createElement(Sparkline, { values: [0, 0, 0], label: "none" }),
    createElement(RingGauge, { percent: 0, label: "none" }),
    createElement(Donut, { segments: [{ label: "a", value: 0 }], label: "none" }),
    createElement(FunnelChart, { stages: funnel([{ label: "a", count: 0 }, { label: "b", count: 0 }]) }),
    createElement(ColumnChart, { buckets: histogram([], [0, 50, 100]), label: "none" }),
    createElement(HeatCalendar, { cells: activityGrid([], 4) }),
  ];
  for (const element of empty) assert.doesNotMatch(renderToStaticMarkup(element), /NaN|Infinity/);
  assert.match(renderToStaticMarkup(createElement(HeatCalendar, { cells: activityGrid(dates, 4) })), /rounded-md/);
});

test("the admin dashboard renders every section, including an empty platform", () => {
  const series = bucketByDay(dates, 30);
  const html = renderToStaticMarkup(
    createElement(AdminDashboard, {
      data: {
        students: 12, trainers: 2, publishedCourses: 3, draftCourses: 1, enrollments: 20, lessonsCompleted: 80, quizAttempts: 14, certificates: 2, averageCompletion: 48,
        series: { enrolments: series, activity: series, revenue: series },
        trends: { enrolments: trend(series, 15), activity: trend(series, 15), revenue: trend(series, 15), activeLearners: { current: 5, previous: 0, change: null } },
        activeLearnersLast7Days: 4,
        funnel: funnel([{ label: "Enrolled", count: 12 }, { label: "Certified", count: 2 }]),
        quizDistribution: histogram([30, 70, 90], [0, 40, 80, 100]), quizAverage: 63,
        heat: activityGrid(dates, 8),
        courses: [{ id: "c1", title: "BA Foundations", published: true, enrolled: 9, completed: 3, percent: 55, quizAverage: null }],
        roles: [{ label: "Students", value: 12 }, { label: "Trainers", value: 2 }, { label: "Admins", value: 1 }],
        review: { awaiting: 4, assignmentsAwaiting: 3, projectsAwaiting: 1, oldestWaitingDays: 5, gradedLast30Days: 9, feedbackLast30Days: 6, averageFeedbackScore: null },
        revenueTotal30: 4999,
        recent: [{ id: "a1", who: "Asha", action: "published course", record: "Course", at: now }],
        labels: { from: new Date(now.getTime() - 29 * 86_400_000), to: now },
      },
    })
  );
  for (const text of ["Platform overview", "Learner journey", "Course performance", "BA Foundations", "Review and feedback", "Recent admin activity", "New activity"]) assert.ok(html.includes(text), `missing: ${text}`);
  assert.doesNotMatch(html, /NaN|Infinity|undefined/);
});

test("the trainer dashboard leads with the review queue and flags overdue work", () => {
  const series = bucketByDay(dates, 28);
  const html = renderToStaticMarkup(
    createElement(TrainerDashboard, {
      data: {
        activeLearners: 6, stalledCount: 1, stalled: [{ id: "s1", name: "Ravi" }], stalledAfterDays: 7, pendingGrading: 2,
        courses: [{ id: "c1", title: "BA Foundations", learners: 6, percent: 40 }],
        engagement: { series, trend: trend(series, 14), activeThisWeek: 4 },
        risk: { "on-track": 4, slowing: 1, stalled: 1, inactive: 0 },
        atRisk: [{ id: "s1", name: "Ravi", percent: 12, quizAverage: null, daysIdle: 9, risk: "stalled" as const }],
        topLearners: [{ id: "t1", name: "Meera", percent: 90, quizAverage: 88, daysIdle: 0, risk: "on-track" as const }],
        averageProgress: 41,
        review: {
          queue: [{ id: "q1", kind: "Assignment" as const, title: "Stakeholder map", detail: "BA Foundations", student: "Ravi", submittedAt: new Date(now.getTime() - 5 * 86_400_000), waitingDays: 5, overdue: true }],
          overdue: 1, reviewedLast30Days: 3, averageScore: 82, recent: [],
        },
        quizDistribution: histogram([50, 90], [0, 40, 80, 100]),
      },
    })
  );
  assert.ok(html.includes("1 submission overdue for review"));
  assert.ok(html.includes("Stakeholder map") && html.includes("5 days"));
  assert.doesNotMatch(html, /NaN|Infinity/);
});

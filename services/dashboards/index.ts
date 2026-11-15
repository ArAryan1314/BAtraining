import { prisma } from "@/lib/db/prisma";
import { requirePermission, type SessionUser } from "@/lib/auth/guards";
import { calculateStreak } from "@/lib/progress/streak";
import { activityGrid, averageOf, bucketByDay, daysSince, funnel, histogram, percentOf, riskOf, sumByDay, trend, type Risk } from "@/lib/analytics/series";
import { learnerWhere } from "@/services/cohorts";
import { listMyCourses } from "@/services/courses";

const STALLED_AFTER_DAYS = 7;
const ATTENTION_LIST_SIZE = 5;
const STREAK_LOOKBACK_EVENTS = 400;
/** Two 30-day windows, so every headline number can be compared with the period before it. */
const TREND_DAYS = 60;
const TREND_WINDOW = 30;
const SCORE_EDGES = [0, 40, 60, 80, 100];
const QUEUE_SIZE = 8;
/** A submission waiting this many days or more is flagged as overdue for review. */
const REVIEW_OVERDUE_DAYS = 3;
const MAX_ROWS = 20_000;

const average = (values: number[]) => (values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : 0);
const daysBefore = (days: number) => new Date(Date.now() - days * 86_400_000);

export async function getStudentDashboard(actor: SessionUser) {
  requirePermission(actor, "progress.read");
  const now = new Date();
  const [courses, events, scores, deadlines, feedback, graded, lessonsCompleted] = await Promise.all([
    listMyCourses(actor),
    prisma.progressEvent.findMany({
      where: { studentId: actor.id, occurredAt: { gte: daysBefore(16 * 7) } },
      select: { occurredAt: true },
      orderBy: { occurredAt: "desc" },
      take: STREAK_LOOKBACK_EVENTS * 4,
    }),
    prisma.quizAttempt.findMany({
      where: { studentId: actor.id, score: { not: null } },
      select: { score: true, completedAt: true, quiz: { select: { title: true, passScore: true } } },
      orderBy: { completedAt: "desc" },
      take: 8,
    }),
    prisma.assignment.findMany({
      where: { dueAt: { not: null }, course: { enrollments: { some: { studentId: actor.id, status: "ACTIVE" } } }, submissions: { none: { studentId: actor.id } } },
      select: { id: true, title: true, dueAt: true, points: true, course: { select: { title: true } } },
      orderBy: { dueAt: "asc" },
      take: 6,
    }),
    prisma.feedback.findMany({
      where: { studentId: actor.id },
      select: { id: true, notes: true, score: true, createdAt: true, trainer: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      take: 4,
    }),
    prisma.assignmentSubmission.findMany({ where: { studentId: actor.id, score: { not: null } }, select: { score: true, assignment: { select: { points: true } } } }),
    prisma.lessonProgress.count({ where: { studentId: actor.id, completed: true } }),
  ]);
  const dates = events.map((event) => event.occurredAt);
  const week = bucketByDay(dates, 14, now);
  const completedCourses = courses.filter((course) => course.completionPercent === 100).length;
  return {
    courses,
    progress: {
      overallPercent: average(courses.map((course) => course.completionPercent)),
      activeStreakDays: calculateStreak(dates.slice(0, STREAK_LOOKBACK_EVENTS)),
      completedCourses,
      activeCourses: courses.length - completedCourses,
    },
    lessonsCompleted,
    activity: { grid: activityGrid(dates, 16, now), last14Days: week, trend: trend(week, 7), activeDays: new Set(dates.map((d) => d.toISOString().slice(0, 10))).size },
    quizzes: {
      recent: scores.map((attempt) => ({ title: attempt.quiz.title, score: Math.round(attempt.score ?? 0), passScore: attempt.quiz.passScore, at: attempt.completedAt })).reverse(),
      average: averageOf(scores.map((attempt) => attempt.score ?? 0)),
    },
    assignmentAverage: averageOf(graded.map((row) => percentOf(row.score ?? 0, row.assignment.points))),
    deadlines: deadlines.map((assignment) => ({
      id: assignment.id,
      title: assignment.title,
      course: assignment.course.title,
      points: assignment.points,
      dueAt: assignment.dueAt as Date,
      overdue: (assignment.dueAt as Date) < now,
    })),
    feedback: feedback.map((item) => ({ id: item.id, notes: item.notes, score: item.score, at: item.createdAt, trainer: item.trainer.name })),
  };
}

export async function getTrainerDashboard(actor: SessionUser) {
  requirePermission(actor, "reports.read");
  const now = new Date();
  const stalledSince = daysBefore(STALLED_AFTER_DAYS);
  const learners = learnerWhere(actor);
  const stalledWhere = {
    ...learners,
    enrollments: { some: { status: "ACTIVE" as const } },
    progressEvents: { none: { occurredAt: { gte: stalledSince } } },
  };

  const [activeLearners, stalledCount, stalled, gradableAssignments, gradableProjects, courses, events, roster, assignmentQueue, projectQueue, feedbackGiven, recentFeedback, quizScores] = await Promise.all([
    prisma.user.count({ where: { ...learners, enrollments: { some: { status: "ACTIVE" } } } }),
    prisma.user.count({ where: stalledWhere }),
    prisma.user.findMany({ where: stalledWhere, select: { id: true, name: true }, orderBy: { name: "asc" }, take: ATTENTION_LIST_SIZE }),
    prisma.assignmentSubmission.count({ where: { score: null, student: learners } }),
    prisma.projectSubmission.count({ where: { status: { in: ["SUBMITTED", "UNDER_REVIEW"] }, student: learners } }),
    prisma.course.findMany({
      where: { published: true, enrollments: { some: { student: learners } } },
      select: { id: true, title: true, enrollments: { where: { student: learners }, select: { progress: { select: { overallPercent: true } } } } },
      orderBy: { title: "asc" },
    }),
    prisma.progressEvent.findMany({ where: { student: learners, occurredAt: { gte: daysBefore(28) } }, select: { occurredAt: true, studentId: true }, take: MAX_ROWS }),
    prisma.user.findMany({
      where: { ...learners, enrollments: { some: { status: "ACTIVE" } } },
      select: {
        id: true,
        name: true,
        enrollments: { select: { progress: { select: { overallPercent: true } } } },
        progressEvents: { select: { occurredAt: true }, orderBy: { occurredAt: "desc" }, take: 1 },
        quizAttempts: { where: { score: { not: null } }, select: { score: true } },
      },
      orderBy: { name: "asc" },
      take: 200,
    }),
    prisma.assignmentSubmission.findMany({
      where: { score: null, student: learners },
      select: { id: true, submittedAt: true, student: { select: { name: true } }, assignment: { select: { title: true, points: true, course: { select: { title: true } } } } },
      orderBy: { submittedAt: "asc" },
      take: QUEUE_SIZE,
    }),
    prisma.projectSubmission.findMany({
      where: { status: { in: ["SUBMITTED", "UNDER_REVIEW"] }, student: learners },
      select: { id: true, title: true, status: true, submittedAt: true, student: { select: { name: true } } },
      orderBy: { submittedAt: "asc" },
      take: QUEUE_SIZE,
    }),
    prisma.feedback.aggregate({ where: { trainerId: actor.id, createdAt: { gte: daysBefore(30) } }, _count: true, _avg: { score: true } }),
    prisma.feedback.findMany({ where: { trainerId: actor.id }, select: { id: true, notes: true, score: true, createdAt: true, student: { select: { name: true } } }, orderBy: { createdAt: "desc" }, take: 4 }),
    prisma.quizAttempt.findMany({ where: { student: learners, score: { not: null } }, select: { score: true }, take: 2000 }),
  ]);

  const engagement = bucketByDay(events.map((event) => event.occurredAt), 28, now);
  const rows = roster.map((learner) => {
    const last = learner.progressEvents[0]?.occurredAt ?? null;
    const idle = last ? daysSince(last, now) : null;
    return {
      id: learner.id,
      name: learner.name,
      percent: average(learner.enrollments.map((enrollment) => enrollment.progress?.overallPercent ?? 0)),
      quizAverage: averageOf(learner.quizAttempts.map((attempt) => attempt.score ?? 0)),
      daysIdle: idle,
      risk: riskOf(idle),
    };
  });
  const riskCounts: Record<Risk, number> = { "on-track": 0, slowing: 0, stalled: 0, inactive: 0 };
  for (const row of rows) riskCounts[row.risk] += 1;

  const queue = [
    ...assignmentQueue.map((item) => ({ id: item.id, kind: "Assignment" as const, title: item.assignment.title, detail: item.assignment.course.title, student: item.student.name, submittedAt: item.submittedAt })),
    ...projectQueue.map((item) => ({ id: item.id, kind: "Project" as const, title: item.title, detail: item.status === "UNDER_REVIEW" ? "Under review" : "Newly submitted", student: item.student.name, submittedAt: item.submittedAt })),
  ]
    .sort((a, b) => a.submittedAt.getTime() - b.submittedAt.getTime())
    .slice(0, QUEUE_SIZE)
    .map((item) => ({ ...item, waitingDays: daysSince(item.submittedAt, now), overdue: daysSince(item.submittedAt, now) >= REVIEW_OVERDUE_DAYS }));

  return {
    activeLearners,
    stalledCount,
    stalled,
    stalledAfterDays: STALLED_AFTER_DAYS,
    pendingGrading: gradableAssignments + gradableProjects,
    courses: courses.map((course) => ({
      id: course.id,
      title: course.title,
      learners: course.enrollments.length,
      percent: average(course.enrollments.map((enrollment) => enrollment.progress?.overallPercent ?? 0)),
    })),
    engagement: { series: engagement, trend: trend(engagement, 14), activeThisWeek: new Set(events.filter((e) => daysSince(e.occurredAt, now) < 7).map((e) => e.studentId)).size },
    risk: riskCounts,
    atRisk: rows.filter((row) => row.risk === "stalled" || row.risk === "inactive").sort((a, b) => (b.daysIdle ?? 999) - (a.daysIdle ?? 999)).slice(0, ATTENTION_LIST_SIZE),
    topLearners: [...rows].sort((a, b) => b.percent - a.percent).slice(0, ATTENTION_LIST_SIZE),
    averageProgress: average(rows.map((row) => row.percent)),
    review: {
      queue,
      overdue: queue.filter((item) => item.overdue).length,
      reviewedLast30Days: feedbackGiven._count,
      averageScore: feedbackGiven._avg.score === null ? null : Math.round(feedbackGiven._avg.score),
      recent: recentFeedback.map((item) => ({ id: item.id, notes: item.notes, score: item.score, at: item.createdAt, student: item.student.name })),
    },
    quizDistribution: histogram(quizScores.map((attempt) => attempt.score ?? 0), SCORE_EDGES),
  };
}

export async function getAdminDashboard(actor: SessionUser) {
  requirePermission(actor, "analytics.read");
  const now = new Date();
  const since = daysBefore(TREND_DAYS);
  const [
    students, trainers, publishedCourses, draftCourses, enrollments, lessonsCompleted, quizAttempts, certificates, completion,
    enrolmentRows, eventRows, paymentRows, funnelCounts, quizScores, courseRows, roleRows, recentAudit,
    ungradedAssignments, oldestAssignment, pendingProjects, oldestProject, feedbackLast30, gradedLast30,
  ] = await Promise.all([
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.user.count({ where: { role: "TRAINER" } }),
    prisma.course.count({ where: { published: true } }),
    prisma.course.count({ where: { published: false } }),
    prisma.enrollment.count(),
    prisma.lessonProgress.count({ where: { completed: true } }),
    prisma.quizAttempt.count(),
    prisma.certificate.count({ where: { status: "ISSUED" } }),
    prisma.courseProgress.aggregate({ _avg: { overallPercent: true } }),
    prisma.enrollment.findMany({ where: { enrolledAt: { gte: since } }, select: { enrolledAt: true }, take: MAX_ROWS }),
    prisma.progressEvent.findMany({ where: { occurredAt: { gte: since } }, select: { occurredAt: true, studentId: true }, take: MAX_ROWS }),
    prisma.payment.findMany({ where: { status: "PAID", createdAt: { gte: since } }, select: { createdAt: true, amount: true }, take: MAX_ROWS }),
    Promise.all([
      prisma.user.count({ where: { role: "STUDENT", enrollments: { some: {} } } }),
      prisma.user.count({ where: { role: "STUDENT", lessonProgress: { some: { completed: true } } } }),
      prisma.user.count({ where: { role: "STUDENT", courseProgress: { some: { overallPercent: { gte: 50 } } } } }),
      prisma.user.count({ where: { role: "STUDENT", enrollments: { some: { status: "COMPLETED" } } } }),
      prisma.user.count({ where: { role: "STUDENT", certificates: { some: { status: "ISSUED" } } } }),
    ]),
    prisma.quizAttempt.findMany({ where: { score: { not: null } }, select: { score: true }, orderBy: { completedAt: "desc" }, take: 5000 }),
    prisma.course.findMany({
      select: {
        id: true,
        title: true,
        published: true,
        enrollments: { select: { status: true, progress: { select: { overallPercent: true } } } },
        quizzes: { select: { attempts: { where: { score: { not: null } }, select: { score: true } } } },
      },
      orderBy: { title: "asc" },
    }),
    prisma.user.groupBy({ by: ["role"], _count: true }),
    prisma.auditLog.findMany({ select: { id: true, action: true, entityType: true, createdAt: true, actor: { select: { name: true } } }, orderBy: { createdAt: "desc" }, take: 8 }),
    prisma.assignmentSubmission.count({ where: { score: null } }),
    prisma.assignmentSubmission.findFirst({ where: { score: null }, select: { submittedAt: true }, orderBy: { submittedAt: "asc" } }),
    prisma.projectSubmission.count({ where: { status: { in: ["SUBMITTED", "UNDER_REVIEW"] } } }),
    prisma.projectSubmission.findFirst({ where: { status: { in: ["SUBMITTED", "UNDER_REVIEW"] } }, select: { submittedAt: true }, orderBy: { submittedAt: "asc" } }),
    prisma.feedback.aggregate({ where: { createdAt: { gte: daysBefore(30) } }, _count: true, _avg: { score: true } }),
    prisma.assignmentSubmission.count({ where: { score: { not: null }, submittedAt: { gte: daysBefore(30) } } }),
  ]);

  const eventDates = eventRows.map((row) => row.occurredAt);
  const learnersActive = (from: number, to: number) => new Set(eventRows.filter((row) => { const age = daysSince(row.occurredAt, now); return age >= from && age < to; }).map((row) => row.studentId)).size;
  const activeNow = learnersActive(0, TREND_WINDOW);
  const activePrevious = learnersActive(TREND_WINDOW, TREND_DAYS);
  const enrolmentSeries = bucketByDay(enrolmentRows.map((row) => row.enrolledAt), TREND_DAYS, now);
  const activitySeries = bucketByDay(eventDates, TREND_DAYS, now);
  const revenueSeries = sumByDay(paymentRows.map((row) => ({ at: row.createdAt, value: Number(row.amount) })), TREND_DAYS, now);
  const oldest = [oldestAssignment?.submittedAt, oldestProject?.submittedAt].filter((date): date is Date => Boolean(date)).sort((a, b) => a.getTime() - b.getTime())[0];
  const roleCount = (role: string) => roleRows.find((row) => row.role === role)?._count ?? 0;

  return {
    students,
    trainers,
    publishedCourses,
    draftCourses,
    enrollments,
    lessonsCompleted,
    quizAttempts,
    certificates,
    averageCompletion: Math.round(completion._avg.overallPercent ?? 0),
    series: { enrolments: enrolmentSeries.slice(-TREND_WINDOW), activity: activitySeries.slice(-TREND_WINDOW), revenue: revenueSeries.slice(-TREND_WINDOW) },
    trends: {
      enrolments: trend(enrolmentSeries, TREND_WINDOW),
      activity: trend(activitySeries, TREND_WINDOW),
      revenue: trend(revenueSeries, TREND_WINDOW),
      activeLearners: { current: activeNow, previous: activePrevious, change: activePrevious === 0 ? null : Math.round(((activeNow - activePrevious) / activePrevious) * 100) },
    },
    activeLearnersLast7Days: learnersActive(0, 7),
    funnel: funnel([
      { label: "Enrolled", count: funnelCounts[0] },
      { label: "Completed a lesson", count: funnelCounts[1] },
      { label: "Reached 50%", count: funnelCounts[2] },
      { label: "Finished a course", count: funnelCounts[3] },
      { label: "Certified", count: funnelCounts[4] },
    ]),
    quizDistribution: histogram(quizScores.map((row) => row.score ?? 0), SCORE_EDGES),
    quizAverage: averageOf(quizScores.map((row) => row.score ?? 0)),
    heat: activityGrid(eventDates, 8, now),
    courses: courseRows
      .map((course) => ({
        id: course.id,
        title: course.title,
        published: course.published,
        enrolled: course.enrollments.length,
        completed: course.enrollments.filter((enrollment) => enrollment.status === "COMPLETED").length,
        percent: average(course.enrollments.map((enrollment) => enrollment.progress?.overallPercent ?? 0)),
        quizAverage: averageOf(course.quizzes.flatMap((quiz) => quiz.attempts.map((attempt) => attempt.score ?? 0))),
      }))
      .sort((a, b) => b.enrolled - a.enrolled),
    roles: [
      { label: "Students", value: roleCount("STUDENT") },
      { label: "Trainers", value: roleCount("TRAINER") },
      { label: "Admins", value: roleCount("ADMIN") },
    ],
    review: {
      awaiting: ungradedAssignments + pendingProjects,
      assignmentsAwaiting: ungradedAssignments,
      projectsAwaiting: pendingProjects,
      oldestWaitingDays: oldest ? daysSince(oldest, now) : null,
      gradedLast30Days: gradedLast30,
      feedbackLast30Days: feedbackLast30._count,
      averageFeedbackScore: feedbackLast30._avg.score === null ? null : Math.round(feedbackLast30._avg.score),
    },
    revenueTotal30: Math.round(revenueSeries.slice(-TREND_WINDOW).reduce((total, value) => total + value, 0)),
    recent: recentAudit.map((log) => ({ id: log.id, who: log.actor.name, action: log.action, record: log.entityType, at: log.createdAt })),
    labels: { from: new Date(now.getTime() - (TREND_WINDOW - 1) * 86_400_000), to: now },
  };
}

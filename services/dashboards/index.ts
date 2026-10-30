import { prisma } from "@/lib/db/prisma";
import { requirePermission, type SessionUser } from "@/lib/auth/guards";
import { calculateStreak } from "@/lib/progress/streak";
import { listMyCourses } from "@/services/courses";

const STALLED_AFTER_DAYS = 7;
const ATTENTION_LIST_SIZE = 5;
const STREAK_LOOKBACK_EVENTS = 400;

const average = (values: number[]) => (values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : 0);

export async function getStudentDashboard(actor: SessionUser) {
  requirePermission(actor, "progress.read");
  const [courses, events] = await Promise.all([
    listMyCourses(actor),
    prisma.progressEvent.findMany({
      where: { studentId: actor.id },
      select: { occurredAt: true },
      orderBy: { occurredAt: "desc" },
      take: STREAK_LOOKBACK_EVENTS,
    }),
  ]);
  const completedCourses = courses.filter((course) => course.completionPercent === 100).length;
  return {
    courses,
    progress: {
      overallPercent: average(courses.map((course) => course.completionPercent)),
      activeStreakDays: calculateStreak(events.map((event) => event.occurredAt)),
      completedCourses,
      activeCourses: courses.length - completedCourses,
    },
  };
}

export async function getTrainerDashboard(actor: SessionUser) {
  requirePermission(actor, "reports.read");
  const stalledSince = new Date(Date.now() - STALLED_AFTER_DAYS * 86_400_000);
  const stalledWhere = {
    role: "STUDENT" as const,
    enrollments: { some: { status: "ACTIVE" as const } },
    progressEvents: { none: { occurredAt: { gte: stalledSince } } },
  };

  const [activeLearners, stalledCount, stalled, gradableAssignments, gradableProjects, courses] = await Promise.all([
    prisma.user.count({ where: { role: "STUDENT", enrollments: { some: { status: "ACTIVE" } } } }),
    prisma.user.count({ where: stalledWhere }),
    prisma.user.findMany({ where: stalledWhere, select: { id: true, name: true }, orderBy: { name: "asc" }, take: ATTENTION_LIST_SIZE }),
    prisma.assignmentSubmission.count({ where: { score: null } }),
    prisma.projectSubmission.count({ where: { status: { in: ["SUBMITTED", "UNDER_REVIEW"] } } }),
    prisma.course.findMany({
      where: { published: true, enrollments: { some: {} } },
      select: { id: true, title: true, enrollments: { select: { progress: { select: { overallPercent: true } } } } },
      orderBy: { title: "asc" },
    }),
  ]);

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
  };
}

export async function getAdminDashboard(actor: SessionUser) {
  requirePermission(actor, "analytics.read");
  const [students, trainers, publishedCourses, draftCourses, enrollments, lessonsCompleted, quizAttempts, certificates, completion] = await Promise.all([
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.user.count({ where: { role: "TRAINER" } }),
    prisma.course.count({ where: { published: true } }),
    prisma.course.count({ where: { published: false } }),
    prisma.enrollment.count(),
    prisma.lessonProgress.count({ where: { completed: true } }),
    prisma.quizAttempt.count(),
    prisma.certificate.count({ where: { status: "ISSUED" } }),
    prisma.courseProgress.aggregate({ _avg: { overallPercent: true } }),
  ]);
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
  };
}

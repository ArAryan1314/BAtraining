import { prisma } from "@/lib/db/prisma";
import { requirePermission, type SessionUser } from "@/lib/auth/guards";
import { learnerWhere } from "@/services/cohorts";

const AUDIT_LIST_LIMIT = 20;

const average = (values: number[]) => (values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : null);

export async function getLearnerReport(actor: SessionUser) {
  requirePermission(actor, "reports.read");
  const learners = await prisma.user.findMany({
    where: learnerWhere(actor),
    select: {
      id: true,
      name: true,
      email: true,
      enrollments: { select: { status: true, progress: { select: { overallPercent: true } } } },
      quizAttempts: { select: { score: true } },
      progressEvents: { select: { occurredAt: true }, orderBy: { occurredAt: "desc" }, take: 1 },
    },
    orderBy: { name: "asc" },
  });
  return learners.map((learner) => ({
    id: learner.id,
    name: learner.name,
    email: learner.email,
    courses: learner.enrollments.length,
    completed: learner.enrollments.filter((enrollment) => enrollment.status === "COMPLETED").length,
    percent: average(learner.enrollments.map((enrollment) => enrollment.progress?.overallPercent ?? 0)) ?? 0,
    quizAverage: average(learner.quizAttempts.map((attempt) => attempt.score ?? 0)),
    lastActivity: learner.progressEvents[0]?.occurredAt ?? null,
  }));
}

export async function getPlatformReport(actor: SessionUser) {
  requirePermission(actor, "analytics.read");
  requirePermission(actor, "audit.read");
  const [courses, revenue, auditLogs] = await Promise.all([
    prisma.course.findMany({
      select: { id: true, title: true, published: true, enrollments: { select: { status: true, progress: { select: { overallPercent: true } } } } },
      orderBy: { title: "asc" },
    }),
    prisma.payment.groupBy({ by: ["currency"], where: { status: "PAID" }, _sum: { amount: true } }),
    prisma.auditLog.findMany({ include: { actor: { select: { name: true } } }, orderBy: { createdAt: "desc" }, take: AUDIT_LIST_LIMIT }),
  ]);
  return {
    courses: courses.map((course) => ({
      id: course.id,
      title: course.title,
      published: course.published,
      enrolled: course.enrollments.length,
      completed: course.enrollments.filter((enrollment) => enrollment.status === "COMPLETED").length,
      percent: average(course.enrollments.map((enrollment) => enrollment.progress?.overallPercent ?? 0)) ?? 0,
    })),
    revenue: revenue.map((row) => ({ currency: row.currency, total: row._sum.amount?.toString() ?? "0" })),
    auditLogs,
  };
}

/** Reports which integrations are configured. Only ever returns yes or no, never the values. */
export function getIntegrationStatus(actor: SessionUser) {
  requirePermission(actor, "settings.write");
  return [
    { name: "Database", configured: Boolean(process.env.DATABASE_URL) },
    { name: "Sign-in secret", configured: Boolean(process.env.AUTH_SECRET) },
    { name: "Email delivery", configured: Boolean(process.env.EMAIL_PROVIDER_API_KEY) },
    { name: "Payment gateway", configured: Boolean(process.env.PAYMENT_PROVIDER_SECRET) },
    { name: "File storage", configured: Boolean(process.env.STORAGE_BUCKET) },
    { name: "Product analytics", configured: Boolean(process.env.ANALYTICS_WRITE_KEY) },
  ];
}

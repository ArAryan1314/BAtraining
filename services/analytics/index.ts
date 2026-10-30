import { prisma } from "@/lib/db/prisma";
import { requirePermission, type SessionUser } from "@/lib/auth/guards";

export async function getPlatformEventCounts(actor: SessionUser) {
  requirePermission(actor, "analytics.read");
  const events = await prisma.progressEvent.groupBy({ by: ["type"], _count: { _all: true } });
  return events.map((event) => ({ type: event.type, count: event._count._all }));
}

export async function getEnrollmentCount(actor: SessionUser) {
  requirePermission(actor, "analytics.read");
  return prisma.enrollment.count();
}

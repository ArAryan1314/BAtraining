import { prisma } from "@/lib/db/prisma";
import type { SessionUser } from "@/lib/auth/guards";

export async function listUnreadNotifications(actor: SessionUser) {
  return prisma.notification.findMany({ where: { userId: actor.id, readAt: null }, orderBy: { createdAt: "desc" } });
}

export async function markNotificationRead(actor: SessionUser, id: string) {
  return prisma.notification.updateMany({ where: { id, userId: actor.id }, data: { readAt: new Date() } });
}

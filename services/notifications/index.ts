import { prisma } from "@/lib/db/prisma";
import { requirePermission, type SessionUser } from "@/lib/auth/guards";

const NOTIFICATION_LIST_LIMIT = 50;

/** Internal: callers have already authorized the action that triggers the notification. */
export async function notify(userId: string, title: string, body: string) {
  return prisma.notification.create({ data: { userId, title, body } });
}

export async function listMyNotifications(actor: SessionUser) {
  requirePermission(actor, "notifications.read");
  return prisma.notification.findMany({ where: { userId: actor.id }, orderBy: { createdAt: "desc" }, take: NOTIFICATION_LIST_LIMIT });
}

export async function markAllNotificationsRead(actor: SessionUser) {
  requirePermission(actor, "notifications.read");
  return prisma.notification.updateMany({ where: { userId: actor.id, readAt: null }, data: { readAt: new Date() } });
}

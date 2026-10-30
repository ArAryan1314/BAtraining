import { prisma } from "@/lib/db/prisma";
import { requirePermission, requireSelfOrPermission, type SessionUser } from "@/lib/auth/guards";
import type { UserRole } from "@/types/user";

const USER_LIST_LIMIT = 200;

export async function getUserById(actor: SessionUser, id: string) {
  requireSelfOrPermission(actor, id, "users.read");
  return prisma.user.findUnique({ where: { id }, omit: { passwordHash: true } });
}

export async function listUsers(actor: SessionUser, role?: UserRole) {
  requirePermission(actor, "users.read");
  return prisma.user.findMany({ where: { role }, omit: { passwordHash: true }, orderBy: { name: "asc" }, take: USER_LIST_LIMIT });
}

import { prisma } from "@/lib/db/prisma";
import { requirePermission, requireSelfOrPermission, type SessionUser } from "@/lib/auth/guards";
import type { PortfolioVisibility } from "@/types/portfolio";

export async function getStudentPortfolio(actor: SessionUser, studentId: string) {
  requireSelfOrPermission(actor, studentId, "students.read");
  return prisma.portfolio.findUnique({ where: { studentId }, include: { items: { orderBy: { sortOrder: "asc" } } } });
}

export async function upsertMyPortfolio(actor: SessionUser, input: { headline?: string; summary?: string; visibility?: PortfolioVisibility }) {
  requirePermission(actor, "portfolio.write");
  return prisma.portfolio.upsert({
    where: { studentId: actor.id },
    create: { studentId: actor.id, ...input },
    update: input,
  });
}

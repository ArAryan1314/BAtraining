import { prisma } from "@/lib/db/prisma";
import { requirePermission, requireSelfOrPermission, type SessionUser } from "@/lib/auth/guards";
import { writeAuditLog } from "@/services/security";
import type { ProjectStatus } from "@/types/project";

export async function listStudentProjects(actor: SessionUser, studentId: string) {
  requireSelfOrPermission(actor, studentId, "projects.review");
  return prisma.project.findMany({
    where: { studentId },
    include: { milestones: true, submissions: true },
    orderBy: { updatedAt: "desc" },
  });
}

export async function updateProjectStatus(actor: SessionUser, projectId: string, status: ProjectStatus) {
  requirePermission(actor, "projects.review");
  const project = await prisma.project.update({ where: { id: projectId }, data: { status } });
  await writeAuditLog({ actorId: actor.id, action: "project.status", entityType: "Project", entityId: projectId, metadata: { status } });
  return project;
}

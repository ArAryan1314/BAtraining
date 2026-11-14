import { prisma } from "@/lib/db/prisma";
import { DomainError } from "@/lib/actions/result";
import { requirePermission, requireSelfOrPermission, type SessionUser } from "@/lib/auth/guards";
import { projectInputSchema, projectReviewSchema, projectSubmitSchema } from "@/lib/validations/domain";
import { learnerWhere, requireLearnerInScope } from "@/services/cohorts";
import { notify } from "@/services/notifications";
import { recordProgressEvent } from "@/services/progress/record-event";
import { writeAuditLog } from "@/services/security";
import type { ProjectStatus } from "@/types/project";

export async function listStudentProjects(actor: SessionUser, studentId: string) {
  requireSelfOrPermission(actor, studentId, "projects.review");
  const [projects, feedback] = await Promise.all([
    prisma.project.findMany({
      where: { studentId },
      include: { submissions: { orderBy: { submittedAt: "desc" } } },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.feedback.findMany({ where: { studentId, entityType: "ProjectSubmission" }, orderBy: { createdAt: "desc" } }),
  ]);
  return projects.map((project) => ({
    ...project,
    submissions: project.submissions.map((submission) => ({
      ...submission,
      feedback: feedback.find((item) => item.entityId === submission.id)?.notes ?? null,
    })),
  }));
}

export async function createProject(actor: SessionUser, input: unknown) {
  requirePermission(actor, "projects.submit");
  await prisma.project.create({ data: { ...projectInputSchema.parse(input), studentId: actor.id, status: "IN_PROGRESS" } });
}

export async function submitProject(actor: SessionUser, input: unknown) {
  requirePermission(actor, "projects.submit");
  const { projectId, title, contentUrl, notes } = projectSubmitSchema.parse(input);
  const project = await prisma.project.findFirst({ where: { id: projectId, studentId: actor.id } });
  if (!project) throw new Error("FORBIDDEN");
  if (project.status === "COMPLETED") throw new DomainError("This project has already been accepted.");
  await prisma.projectSubmission.create({ data: { projectId, studentId: actor.id, title, contentUrl, notes } });
  await prisma.project.update({ where: { id: projectId }, data: { status: "REVIEW" } });
}

export async function listProjectReviewQueue(actor: SessionUser) {
  requirePermission(actor, "projects.review");
  return prisma.projectSubmission.findMany({
    where: { status: { in: ["SUBMITTED", "UNDER_REVIEW"] }, student: learnerWhere(actor) },
    include: { student: { select: { name: true } }, project: { select: { title: true, description: true } } },
    orderBy: { submittedAt: "asc" },
  });
}

export async function reviewProjectSubmission(actor: SessionUser, input: unknown) {
  requirePermission(actor, "projects.review");
  const { submissionId, decision, notes } = projectReviewSchema.parse(input);
  const submission = await prisma.projectSubmission.findUnique({ where: { id: submissionId }, include: { project: true } });
  if (!submission) throw new DomainError("This submission no longer exists.");
  await requireLearnerInScope(actor, submission.studentId);

  const accepted = decision === "ACCEPTED";
  await prisma.$transaction([
    prisma.projectSubmission.update({ where: { id: submissionId }, data: { status: decision } }),
    prisma.project.update({ where: { id: submission.projectId }, data: { status: accepted ? "COMPLETED" : "IN_PROGRESS" } }),
    prisma.feedback.create({ data: { studentId: submission.studentId, trainerId: actor.id, entityType: "ProjectSubmission", entityId: submissionId, notes } }),
  ]);
  await recordProgressEvent({ studentId: submission.studentId, type: "FEEDBACK_RECEIVED", entityId: submissionId, metadata: { decision } });
  await notify(submission.studentId, accepted ? "Project accepted" : "Project needs changes", `${submission.project.title}: ${notes}`);
  await writeAuditLog({ actorId: actor.id, action: "project.review", entityType: "ProjectSubmission", entityId: submissionId, metadata: { decision } });
}

export async function updateProjectStatus(actor: SessionUser, projectId: string, status: ProjectStatus) {
  requirePermission(actor, "projects.review");
  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) throw new DomainError("This project no longer exists.");
  await requireLearnerInScope(actor, project.studentId);
  const updated = await prisma.project.update({ where: { id: projectId }, data: { status } });
  await writeAuditLog({ actorId: actor.id, action: "project.status", entityType: "Project", entityId: projectId, metadata: { status } });
  return updated;
}

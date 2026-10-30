import { prisma } from "@/lib/db/prisma";
import { DomainError } from "@/lib/actions/result";
import { requirePermission, requireSelfOrPermission, type SessionUser } from "@/lib/auth/guards";
import { enrollmentInputSchema } from "@/lib/validations/domain";
import { writeAuditLog } from "@/services/security";

export async function listEnrollments(actor: SessionUser, studentId: string) {
  requireSelfOrPermission(actor, studentId, "students.read");
  return prisma.enrollment.findMany({ where: { studentId }, include: { course: true, progress: true }, orderBy: { enrolledAt: "desc" } });
}

export async function enrollStudent(actor: SessionUser, input: unknown) {
  requirePermission(actor, "students.write");
  const { studentId, courseId } = enrollmentInputSchema.parse(input);

  const [student, course] = await Promise.all([
    prisma.user.findFirst({ where: { id: studentId, role: "STUDENT" } }),
    prisma.course.findFirst({ where: { id: courseId, published: true } }),
  ]);
  if (!student) throw new DomainError("That student no longer exists.");
  if (!course) throw new DomainError("Students can only join published courses.");

  const existing = await prisma.enrollment.findUnique({ where: { studentId_courseId: { studentId, courseId } } });
  if (existing) throw new DomainError(`${student.name} is already enrolled in ${course.title}.`);

  const enrollment = await prisma.enrollment.create({ data: { studentId, courseId } });
  await writeAuditLog({ actorId: actor.id, action: "enrollment.create", entityType: "Enrollment", entityId: enrollment.id, metadata: { studentId, courseId } });
  return { student, course };
}

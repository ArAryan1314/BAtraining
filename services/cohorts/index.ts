import { prisma } from "@/lib/db/prisma";
import { DomainError } from "@/lib/actions/result";
import { requirePermission, type SessionUser } from "@/lib/auth/guards";
import { cohortInputSchema, cohortMemberSchema } from "@/lib/validations/domain";
import type { Prisma } from "@/generated/prisma/client";
import { writeAuditLog } from "@/services/security";

/** Admins see every student; trainers only see students in their own cohorts. */
export function learnerWhere(actor: SessionUser): Prisma.UserWhereInput {
  if (actor.role === "ADMIN") return { role: "STUDENT" };
  return { role: "STUDENT", cohortMemberships: { some: { cohort: { trainerId: actor.id } } } };
}

export async function requireLearnerInScope(actor: SessionUser, studentId: string) {
  const learner = await prisma.user.findFirst({ where: { id: studentId, ...learnerWhere(actor) }, select: { id: true } });
  if (!learner) throw new Error("FORBIDDEN");
}

async function requireOwnCohort(actor: SessionUser, cohortId: string) {
  const cohort = await prisma.cohort.findFirst({ where: { id: cohortId, ...(actor.role === "ADMIN" ? {} : { trainerId: actor.id }) } });
  if (!cohort) throw new Error("FORBIDDEN");
  return cohort;
}

export async function getCohortWorkspace(actor: SessionUser) {
  requirePermission(actor, "students.read");
  const [cohorts, courses, students] = await Promise.all([
    prisma.cohort.findMany({
      where: { trainerId: actor.id },
      include: {
        course: { select: { id: true, title: true } },
        members: {
          include: {
            student: {
              select: { id: true, name: true, email: true, enrollments: { select: { courseId: true, progress: { select: { overallPercent: true } } } } },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.course.findMany({ where: { published: true }, select: { id: true, title: true }, orderBy: { title: "asc" } }),
    prisma.user.findMany({ where: { role: "STUDENT" }, select: { id: true, name: true, email: true }, orderBy: { name: "asc" } }),
  ]);
  return {
    courses,
    students,
    cohorts: cohorts.map((cohort) => ({
      id: cohort.id,
      name: cohort.name,
      courseTitle: cohort.course.title,
      members: cohort.members.map(({ student }) => ({
        id: student.id,
        name: student.name,
        email: student.email,
        percent: Math.round(student.enrollments.find((enrollment) => enrollment.courseId === cohort.course.id)?.progress?.overallPercent ?? 0),
      })),
    })),
  };
}

export async function createCohort(actor: SessionUser, input: unknown) {
  requirePermission(actor, "students.write");
  const { name, courseId } = cohortInputSchema.parse(input);
  const course = await prisma.course.findFirst({ where: { id: courseId, published: true } });
  if (!course) throw new DomainError("Choose a published course.");
  const cohort = await prisma.cohort.create({ data: { name, courseId, trainerId: actor.id } });
  await writeAuditLog({ actorId: actor.id, action: "cohort.create", entityType: "Cohort", entityId: cohort.id });
}

/** Adding a student to a cohort also enrols them in its course. */
export async function addCohortMember(actor: SessionUser, input: unknown) {
  requirePermission(actor, "students.write");
  const { cohortId, studentId } = cohortMemberSchema.parse(input);
  const cohort = await requireOwnCohort(actor, cohortId);
  const student = await prisma.user.findFirst({ where: { id: studentId, role: "STUDENT" } });
  if (!student) throw new DomainError("That student no longer exists.");

  await prisma.$transaction([
    prisma.cohortMember.upsert({ where: { cohortId_studentId: { cohortId, studentId } }, create: { cohortId, studentId }, update: {} }),
    prisma.enrollment.upsert({ where: { studentId_courseId: { studentId, courseId: cohort.courseId } }, create: { studentId, courseId: cohort.courseId }, update: {} }),
  ]);
  await writeAuditLog({ actorId: actor.id, action: "cohort.addMember", entityType: "Cohort", entityId: cohortId, metadata: { studentId } });
  return `${student.name} added to ${cohort.name}.`;
}

/** Removes the student from the cohort only; their enrolment and progress stay. */
export async function removeCohortMember(actor: SessionUser, input: unknown) {
  requirePermission(actor, "students.write");
  const { cohortId, studentId } = cohortMemberSchema.parse(input);
  await requireOwnCohort(actor, cohortId);
  await prisma.cohortMember.deleteMany({ where: { cohortId, studentId } });
  await writeAuditLog({ actorId: actor.id, action: "cohort.removeMember", entityType: "Cohort", entityId: cohortId, metadata: { studentId } });
}

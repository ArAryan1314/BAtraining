import { prisma } from "@/lib/db/prisma";
import { requirePermission, type SessionUser } from "@/lib/auth/guards";
import { coursePublishSchema } from "@/lib/validations/domain";
import { writeAuditLog } from "@/services/security";

export async function listPrograms(actor: SessionUser) {
  requirePermission(actor, "programs.read");
  return prisma.program.findMany({ include: { courses: true }, orderBy: { createdAt: "desc" } });
}

export async function listCoursesForAdmin(actor: SessionUser) {
  requirePermission(actor, "courses.write");
  return prisma.course.findMany({
    include: { program: true, _count: { select: { modules: true, enrollments: true } } },
    orderBy: { title: "asc" },
  });
}

export async function setCoursePublished(actor: SessionUser, input: unknown) {
  requirePermission(actor, "courses.publish");
  const { courseId, published } = coursePublishSchema.parse(input);
  const course = await prisma.course.update({ where: { id: courseId }, data: { published } });
  await writeAuditLog({ actorId: actor.id, action: published ? "course.publish" : "course.unpublish", entityType: "Course", entityId: courseId });
  return course;
}

import { prisma } from "@/lib/db/prisma";
import { DomainError } from "@/lib/actions/result";
import { requirePermission, type SessionUser } from "@/lib/auth/guards";
import { lessonCompletionSchema } from "@/lib/validations/domain";
import { syncCourseProgress } from "@/services/progress/sync-course-progress";
import { recordProgressEvent } from "@/services/progress/record-event";

/** Marks a lesson complete for the signed-in student. Repeating it changes nothing. */
export async function completeLesson(actor: SessionUser, input: unknown) {
  requirePermission(actor, "progress.write");
  const { courseId, lessonId } = lessonCompletionSchema.parse(input);
  const studentId = actor.id;

  const enrollment = await prisma.enrollment.findUnique({ where: { studentId_courseId: { studentId, courseId } } });
  if (!enrollment || enrollment.status === "PAUSED") throw new DomainError("You aren't enrolled in this course.");

  const lesson = await prisma.lesson.findFirst({ where: { id: lessonId, module: { courseId } } });
  if (!lesson) throw new DomainError("This lesson isn't part of the course.");

  await prisma.$transaction(async (tx) => {
    const existing = await tx.lessonProgress.findUnique({ where: { studentId_lessonId: { studentId, lessonId } } });
    if (existing?.completed) return;
    await tx.lessonProgress.upsert({
      where: { studentId_lessonId: { studentId, lessonId } },
      create: { studentId, lessonId, completed: true, completedAt: new Date() },
      update: { completed: true, completedAt: new Date() },
    });
    await recordProgressEvent({ studentId, type: "LESSON_COMPLETED", entityId: lessonId, metadata: { courseId } }, tx);
  });

  return { overallPercent: await syncCourseProgress(studentId, courseId) };
}

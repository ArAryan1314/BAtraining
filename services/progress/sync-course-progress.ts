import { prisma } from "@/lib/db/prisma";
import { issueCourseCertificate } from "@/services/certificates";
import { getCourseProgress } from "@/services/progress/get-course-progress";

/** Stores the student's course percentage, and on reaching 100 completes the enrolment and issues the certificate. */
export async function syncCourseProgress(studentId: string, courseId: string) {
  const enrollment = await prisma.enrollment.findUnique({ where: { studentId_courseId: { studentId, courseId } }, include: { course: true } });
  if (!enrollment) return 0;

  const overallPercent = await getCourseProgress(studentId, courseId);
  await prisma.courseProgress.upsert({
    where: { enrollmentId: enrollment.id },
    create: { studentId, enrollmentId: enrollment.id, overallPercent },
    update: { overallPercent },
  });

  const status = overallPercent === 100 ? "COMPLETED" : "ACTIVE";
  if (enrollment.status !== status && enrollment.status !== "PAUSED") {
    await prisma.enrollment.update({ where: { id: enrollment.id }, data: { status } });
  }
  if (overallPercent === 100) await issueCourseCertificate(studentId, enrollment.course.title);
  return overallPercent;
}

import { prisma } from "@/lib/db/prisma";
import { calculateProgress } from "@/lib/progress/calculate";

export async function getCourseProgress(studentId: string, courseId: string) {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: { modules: { include: { lessons: true } }, assignments: true, quizzes: true },
  });
  if (!course) throw new Error("COURSE_NOT_FOUND");

  const lessonIds = course.modules.flatMap((module) => module.lessons.map((lesson) => lesson.id));
  const assignmentIds = course.assignments.map((assignment) => assignment.id);

  const [lessonsCompleted, assignmentsCompleted, quizScores] = await Promise.all([
    prisma.lessonProgress.count({ where: { studentId, lessonId: { in: lessonIds }, completed: true } }),
    prisma.assignmentSubmission.count({ where: { studentId, assignmentId: { in: assignmentIds } } }),
    prisma.quizAttempt.aggregate({ where: { studentId, quiz: { courseId } }, _avg: { score: true } }),
  ]);

  return calculateProgress({
    lessonsCompleted,
    lessonsTotal: lessonIds.length,
    assignmentsCompleted,
    assignmentsTotal: assignmentIds.length,
    // Milestones belong to student projects, not courses.
    milestonesCompleted: 0,
    milestonesTotal: 0,
    quizAverage: course.quizzes.length ? (quizScores._avg.score ?? 0) : null,
  });
}

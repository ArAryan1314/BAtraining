import { prisma } from "@/lib/db/prisma";
import { calculateProgress } from "@/lib/progress/calculate";

export async function getCourseProgress(studentId: string, courseId: string) {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      modules: { include: { lessons: true } },
      assignments: true,
      quizzes: { include: { attempts: { where: { studentId }, select: { score: true } } } },
    },
  });
  if (!course) throw new Error("COURSE_NOT_FOUND");

  const lessonIds = course.modules.flatMap((module) => module.lessons.map((lesson) => lesson.id));
  const assignmentIds = course.assignments.map((assignment) => assignment.id);

  const [lessonsCompleted, assignmentsCompleted] = await Promise.all([
    prisma.lessonProgress.count({ where: { studentId, lessonId: { in: lessonIds }, completed: true } }),
    prisma.assignmentSubmission.count({ where: { studentId, assignmentId: { in: assignmentIds } } }),
  ]);

  return calculateProgress({
    lessonsCompleted,
    lessonsTotal: lessonIds.length,
    assignmentsCompleted,
    assignmentsTotal: assignmentIds.length,
    // Milestones belong to student projects, not courses.
    milestonesCompleted: 0,
    milestonesTotal: 0,
    quizzesPassed: course.quizzes.filter((quiz) => quiz.attempts.some((attempt) => (attempt.score ?? 0) >= quiz.passScore)).length,
    quizzesTotal: course.quizzes.length,
  });
}

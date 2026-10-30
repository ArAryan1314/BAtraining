import { prisma } from "@/lib/db/prisma";
import { requirePermission, type SessionUser } from "@/lib/auth/guards";
import { DomainError } from "@/lib/actions/result";
import { recordProgressEvent } from "@/services/progress/record-event";

/** Scores on the server from the stored answers, so a student can't submit their own score. */
export async function submitQuizAttempt(actor: SessionUser, input: { quizId: string; answers: Record<string, string> }) {
  requirePermission(actor, "quizzes.attempt");
  const quiz = await prisma.quiz.findUnique({ where: { id: input.quizId }, include: { questions: true } });
  if (!quiz) throw new DomainError("This quiz no longer exists.");

  const enrollment = await prisma.enrollment.findUnique({ where: { studentId_courseId: { studentId: actor.id, courseId: quiz.courseId } } });
  if (!enrollment) throw new DomainError("You aren't enrolled in this course.");

  const available = quiz.questions.reduce((sum, question) => sum + question.points, 0);
  const earned = quiz.questions.reduce((sum, question) => sum + (input.answers[question.id] === question.answer ? question.points : 0), 0);
  const score = available ? (earned / available) * 100 : 0;

  const attempt = await prisma.quizAttempt.create({
    data: { quizId: quiz.id, studentId: actor.id, score, answers: input.answers, completedAt: new Date() },
  });
  await recordProgressEvent({ studentId: actor.id, type: "QUIZ_ATTEMPTED", entityId: attempt.id, metadata: { quizId: quiz.id, score } });
  return { attemptId: attempt.id, score, passed: score >= quiz.passScore };
}

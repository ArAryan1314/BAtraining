import { prisma } from "@/lib/db/prisma";
import { DomainError } from "@/lib/actions/result";
import { requirePermission, type SessionUser } from "@/lib/auth/guards";
import { assignmentInputSchema, assignmentSubmissionSchema, gradeInputSchema, questionInputSchema, quizInputSchema } from "@/lib/validations/domain";
import { z } from "zod";
import { learnerWhere, requireLearnerInScope } from "@/services/cohorts";
import { notify } from "@/services/notifications";
import { recordProgressEvent } from "@/services/progress/record-event";
import { syncCourseProgress } from "@/services/progress/sync-course-progress";
import { writeAuditLog } from "@/services/security";

const RECENT_ATTEMPTS_LIMIT = 20;
const optionsSchema = z.array(z.string());

const openCourseFor = (studentId: string) => ({ published: true, enrollments: { some: { studentId, status: { not: "PAUSED" as const } } } });

async function requireCourseAccess(studentId: string, courseId: string) {
  const course = await prisma.course.findFirst({ where: { id: courseId, ...openCourseFor(studentId) } });
  if (!course) throw new DomainError("You aren't enrolled in this course.");
}

export async function listMyAssessments(actor: SessionUser) {
  requirePermission(actor, "quizzes.read");
  const [quizzes, assignments] = await Promise.all([
    prisma.quiz.findMany({
      where: { course: openCourseFor(actor.id), questions: { some: {} } },
      include: { course: { select: { title: true } }, attempts: { where: { studentId: actor.id }, select: { score: true } } },
      orderBy: { title: "asc" },
    }),
    prisma.assignment.findMany({
      where: { course: openCourseFor(actor.id) },
      include: { course: { select: { title: true } }, submissions: { where: { studentId: actor.id } } },
      orderBy: { title: "asc" },
    }),
  ]);
  return {
    quizzes: quizzes.map((quiz) => {
      const bestScore = quiz.attempts.length ? Math.max(...quiz.attempts.map((attempt) => attempt.score ?? 0)) : null;
      return { id: quiz.id, title: quiz.title, courseTitle: quiz.course.title, passScore: quiz.passScore, attempts: quiz.attempts.length, bestScore, passed: bestScore !== null && bestScore >= quiz.passScore };
    }),
    assignments: assignments.map((assignment) => ({ id: assignment.id, title: assignment.title, courseTitle: assignment.course.title, points: assignment.points, dueAt: assignment.dueAt, submission: assignment.submissions[0] ?? null })),
  };
}

/** The quiz as a student sees it. Correct answers are deliberately never selected. */
export async function getQuizToTake(actor: SessionUser, quizId: string) {
  requirePermission(actor, "quizzes.read");
  const quiz = await prisma.quiz.findFirst({
    where: { id: quizId, course: openCourseFor(actor.id) },
    select: {
      id: true,
      title: true,
      passScore: true,
      course: { select: { title: true } },
      questions: { select: { id: true, prompt: true, options: true, points: true } },
      attempts: { where: { studentId: actor.id }, select: { score: true } },
    },
  });
  if (!quiz) return null;
  return {
    ...quiz,
    bestScore: quiz.attempts.length ? Math.max(...quiz.attempts.map((attempt) => attempt.score ?? 0)) : null,
    questions: quiz.questions.map((question) => ({ ...question, options: optionsSchema.catch([]).parse(question.options) })),
  };
}

/** Scores on the server from the stored answers, so a student can't submit their own score. */
export async function submitQuizAttempt(actor: SessionUser, input: { quizId: string; answers: Record<string, string> }) {
  requirePermission(actor, "quizzes.attempt");
  const quiz = await prisma.quiz.findUnique({ where: { id: input.quizId }, include: { questions: true } });
  if (!quiz) throw new DomainError("This quiz no longer exists.");
  await requireCourseAccess(actor.id, quiz.courseId);
  if (!quiz.questions.length) throw new DomainError("This quiz has no questions yet.");

  const available = quiz.questions.reduce((sum, question) => sum + question.points, 0);
  const earned = quiz.questions.reduce((sum, question) => sum + (input.answers[question.id] === question.answer ? question.points : 0), 0);
  const score = Math.round((earned / available) * 100);

  const attempt = await prisma.quizAttempt.create({
    data: { quizId: quiz.id, studentId: actor.id, score, answers: input.answers, completedAt: new Date() },
  });
  await recordProgressEvent({ studentId: actor.id, type: "QUIZ_ATTEMPTED", entityId: attempt.id, metadata: { quizId: quiz.id, score } });
  await syncCourseProgress(actor.id, quiz.courseId);
  return { score, passed: score >= quiz.passScore, passScore: quiz.passScore };
}

export async function getAssignmentToSubmit(actor: SessionUser, assignmentId: string) {
  requirePermission(actor, "assignments.read");
  return prisma.assignment.findFirst({
    where: { id: assignmentId, course: openCourseFor(actor.id) },
    include: { course: { select: { title: true } }, submissions: { where: { studentId: actor.id } } },
  });
}

/** A student can revise their answer until it has been graded. */
export async function submitAssignment(actor: SessionUser, input: unknown) {
  requirePermission(actor, "assignments.submit");
  const { assignmentId, content } = assignmentSubmissionSchema.parse(input);
  const assignment = await prisma.assignment.findUnique({ where: { id: assignmentId } });
  if (!assignment) throw new DomainError("This assignment no longer exists.");
  await requireCourseAccess(actor.id, assignment.courseId);

  const key = { assignmentId_studentId: { assignmentId, studentId: actor.id } };
  const existing = await prisma.assignmentSubmission.findUnique({ where: key });
  if (existing && existing.score !== null) throw new DomainError("This assignment has already been graded.");

  await prisma.assignmentSubmission.upsert({
    where: key,
    create: { assignmentId, studentId: actor.id, content },
    update: { content, submittedAt: new Date() },
  });
  if (!existing) {
    await recordProgressEvent({ studentId: actor.id, type: "ASSIGNMENT_SUBMITTED", entityId: assignmentId, metadata: { courseId: assignment.courseId } });
  }
  await syncCourseProgress(actor.id, assignment.courseId);
}

export async function getGradingWorkspace(actor: SessionUser) {
  requirePermission(actor, "assignments.grade");
  const student = learnerWhere(actor);
  const [pending, attempts] = await Promise.all([
    prisma.assignmentSubmission.findMany({
      where: { score: null, student },
      include: { student: { select: { name: true } }, assignment: { include: { course: { select: { title: true } } } } },
      orderBy: { submittedAt: "asc" },
    }),
    prisma.quizAttempt.findMany({
      where: { student },
      select: { id: true, score: true, completedAt: true, student: { select: { name: true } }, quiz: { select: { title: true, passScore: true } } },
      orderBy: { completedAt: "desc" },
      take: RECENT_ATTEMPTS_LIMIT,
    }),
  ]);
  return { pending, attempts };
}

export async function gradeAssignment(actor: SessionUser, input: unknown) {
  requirePermission(actor, "assignments.grade");
  const { submissionId, score, feedback } = gradeInputSchema.parse(input);
  const submission = await prisma.assignmentSubmission.findUnique({ where: { id: submissionId }, include: { assignment: true } });
  if (!submission) throw new DomainError("This submission no longer exists.");
  await requireLearnerInScope(actor, submission.studentId);
  if (score > submission.assignment.points) throw new DomainError(`The score can't be more than ${submission.assignment.points}.`);

  await prisma.assignmentSubmission.update({ where: { id: submissionId }, data: { score, feedback } });
  await recordProgressEvent({ studentId: submission.studentId, type: "FEEDBACK_RECEIVED", entityId: submissionId, metadata: { assignmentId: submission.assignmentId, score } });
  await notify(submission.studentId, "Assignment graded", `${submission.assignment.title}: ${score} of ${submission.assignment.points} points.`);
  await writeAuditLog({ actorId: actor.id, action: "assignment.grade", entityType: "AssignmentSubmission", entityId: submissionId, metadata: { score } });
}

export async function listAssessmentsForAdmin(actor: SessionUser) {
  requirePermission(actor, "quizzes.write");
  return prisma.course.findMany({
    select: {
      id: true,
      title: true,
      quizzes: { select: { id: true, title: true, passScore: true, _count: { select: { questions: true, attempts: true } } }, orderBy: { title: "asc" } },
      assignments: { select: { id: true, title: true, points: true, dueAt: true, _count: { select: { submissions: true } } }, orderBy: { title: "asc" } },
    },
    orderBy: { title: "asc" },
  });
}

export async function createQuiz(actor: SessionUser, input: unknown) {
  requirePermission(actor, "quizzes.write");
  const quiz = await prisma.quiz.create({ data: quizInputSchema.parse(input) });
  await writeAuditLog({ actorId: actor.id, action: "quiz.create", entityType: "Quiz", entityId: quiz.id });
  return quiz;
}

export async function getQuizForEditing(actor: SessionUser, quizId: string) {
  requirePermission(actor, "quizzes.write");
  const quiz = await prisma.quiz.findUnique({ where: { id: quizId }, include: { course: { select: { title: true } }, questions: true } });
  if (!quiz) return null;
  return { ...quiz, questions: quiz.questions.map((question) => ({ ...question, options: optionsSchema.catch([]).parse(question.options) })) };
}

export async function addQuestion(actor: SessionUser, input: unknown) {
  requirePermission(actor, "quizzes.write");
  await prisma.question.create({ data: questionInputSchema.parse(input) });
}

export async function deleteQuestion(actor: SessionUser, input: unknown) {
  requirePermission(actor, "quizzes.write");
  const { questionId } = z.object({ questionId: z.string().min(1) }).parse(input);
  await prisma.question.delete({ where: { id: questionId } });
}

export async function createAssignment(actor: SessionUser, input: unknown) {
  requirePermission(actor, "content.write");
  const assignment = await prisma.assignment.create({ data: assignmentInputSchema.parse(input) });
  await writeAuditLog({ actorId: actor.id, action: "assignment.create", entityType: "Assignment", entityId: assignment.id });
}

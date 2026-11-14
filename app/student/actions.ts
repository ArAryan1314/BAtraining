"use server";

import { act } from "@/lib/actions/act";
import type { ActionResult } from "@/lib/actions/result";
import { submitAssignment, submitQuizAttempt } from "@/services/assessments";
import { markAllNotificationsRead } from "@/services/notifications";
import { completeLesson } from "@/services/progress/complete-lesson";
import { createProject, submitProject } from "@/services/projects";

const ANSWER_PREFIX = "answer:";

export async function completeLessonAction(_previous: ActionResult | null, data: FormData): Promise<ActionResult> {
  return act(data, "/student", async (actor, input) => {
    await completeLesson(actor, input);
  });
}

export async function submitQuizAction(_previous: ActionResult | null, data: FormData): Promise<ActionResult> {
  return act(data, "/student", async (actor, input) => {
    const answers = Object.fromEntries(
      Object.entries(input)
        .filter(([key]) => key.startsWith(ANSWER_PREFIX))
        .map(([key, value]) => [key.slice(ANSWER_PREFIX.length), String(value)]),
    );
    const { score, passed, passScore } = await submitQuizAttempt(actor, { quizId: String(input.quizId), answers });
    return passed ? `You scored ${score}% and passed.` : `You scored ${score}%. You need ${passScore}% to pass, so review the lessons and try again.`;
  });
}

export async function submitAssignmentAction(_previous: ActionResult | null, data: FormData): Promise<ActionResult> {
  return act(data, "/student", async (actor, input) => {
    await submitAssignment(actor, input);
    return "Your answer has been submitted.";
  });
}

export async function createProjectAction(_previous: ActionResult | null, data: FormData): Promise<ActionResult> {
  return act(data, "/student", async (actor, input) => {
    await createProject(actor, input);
  });
}

export async function submitProjectAction(_previous: ActionResult | null, data: FormData): Promise<ActionResult> {
  return act(data, "/student", async (actor, input) => {
    await submitProject(actor, input);
    return "Submitted for review.";
  });
}

export async function markNotificationsReadAction(_previous: ActionResult | null, data: FormData): Promise<ActionResult> {
  return act(data, "/student", async (actor) => {
    await markAllNotificationsRead(actor);
  });
}

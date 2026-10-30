"use server";

import { redirect } from "next/navigation";
import { act } from "@/lib/actions/act";
import type { ActionResult } from "@/lib/actions/result";
import { addQuestion, createAssignment, createQuiz, deleteQuestion } from "@/services/assessments";
import { revokeCertificate } from "@/services/certificates";
import { addLesson, addLessonResource, addModule, createCourse, deleteLesson, deleteLessonResource, deleteModule, publishCourseContent, saveLessonContent, setCoursePublished, updateCourse } from "@/services/cms";
import { enrollStudent } from "@/services/enrollments";
import { recordManualPayment } from "@/services/payments";
import { createUser } from "@/services/users";

export async function enrollStudentAction(_previous: ActionResult | null, data: FormData): Promise<ActionResult> {
  return act(data, "/admin", async (actor, input) => {
    const { student, course } = await enrollStudent(actor, input);
    return `${student.name} is now enrolled in ${course.title}.`;
  });
}

/** Opens the new course in the editor once it has been created. */
export async function createCourseAction(_previous: ActionResult | null, data: FormData): Promise<ActionResult> {
  let courseId: string | undefined;
  const result = await act(data, "/admin", async (actor, input) => {
    courseId = (await createCourse(actor, input)).id;
  });
  if (courseId) redirect(`/admin/content/${courseId}`);
  return result;
}

export async function setCoursePublishedAction(_previous: ActionResult | null, data: FormData): Promise<ActionResult> {
  return act(data, "/admin", async (actor, input) => {
    await setCoursePublished(actor, input);
  });
}

export async function createUserAction(_previous: ActionResult | null, data: FormData): Promise<ActionResult> {
  return act(data, "/admin", createUser);
}

export async function updateCourseAction(_previous: ActionResult | null, data: FormData): Promise<ActionResult> {
  return act(data, "/admin", async (actor, input) => {
    await updateCourse(actor, input);
  });
}

export async function addModuleAction(_previous: ActionResult | null, data: FormData): Promise<ActionResult> {
  return act(data, "/admin", async (actor, input) => {
    await addModule(actor, input);
  });
}

export async function addLessonAction(_previous: ActionResult | null, data: FormData): Promise<ActionResult> {
  return act(data, "/admin", async (actor, input) => {
    await addLesson(actor, input);
  });
}

export async function deleteLessonAction(_previous: ActionResult | null, data: FormData): Promise<ActionResult> {
  return act(data, "/admin", async (actor, input) => {
    await deleteLesson(actor, input);
  });
}

export async function deleteModuleAction(_previous: ActionResult | null, data: FormData): Promise<ActionResult> {
  return act(data, "/admin", async (actor, input) => {
    await deleteModule(actor, input);
  });
}

export async function saveLessonContentAction(_previous: ActionResult | null, data: FormData): Promise<ActionResult> {
  return act(data, "/admin", saveLessonContent);
}

export async function publishCourseContentAction(_previous: ActionResult | null, data: FormData): Promise<ActionResult> {
  return act(data, "/admin", publishCourseContent);
}

export async function addLessonResourceAction(_previous: ActionResult | null, data: FormData): Promise<ActionResult> {
  return act(data, "/admin", async (actor, input) => {
    await addLessonResource(actor, input);
  });
}

export async function deleteLessonResourceAction(_previous: ActionResult | null, data: FormData): Promise<ActionResult> {
  return act(data, "/admin", async (actor, input) => {
    await deleteLessonResource(actor, input);
  });
}

export async function createQuizAction(_previous: ActionResult | null, data: FormData): Promise<ActionResult> {
  return act(data, "/admin", async (actor, input) => {
    await createQuiz(actor, input);
  });
}

export async function addQuestionAction(_previous: ActionResult | null, data: FormData): Promise<ActionResult> {
  return act(data, "/admin", async (actor, input) => {
    await addQuestion(actor, input);
  });
}

export async function deleteQuestionAction(_previous: ActionResult | null, data: FormData): Promise<ActionResult> {
  return act(data, "/admin", async (actor, input) => {
    await deleteQuestion(actor, input);
  });
}

export async function createAssignmentAction(_previous: ActionResult | null, data: FormData): Promise<ActionResult> {
  return act(data, "/admin", async (actor, input) => {
    await createAssignment(actor, input);
  });
}

export async function revokeCertificateAction(_previous: ActionResult | null, data: FormData): Promise<ActionResult> {
  return act(data, "/admin", async (actor, input) => {
    await revokeCertificate(actor, input);
  });
}

export async function recordPaymentAction(_previous: ActionResult | null, data: FormData): Promise<ActionResult> {
  return act(data, "/admin", recordManualPayment);
}

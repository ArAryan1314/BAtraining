"use server";

import { revalidatePath } from "next/cache";
import { runAction, type ActionResult } from "@/lib/actions/result";
import { requireUser } from "@/lib/auth/guards";
import { getSessionUser } from "@/services/auth";
import { setCoursePublished } from "@/services/cms";
import { enrollStudent } from "@/services/enrollments";

export async function enrollStudentAction(_previous: ActionResult | null, formData: FormData): Promise<ActionResult> {
  return runAction(async () => {
    const actor = requireUser(await getSessionUser());
    const { student, course } = await enrollStudent(actor, { studentId: formData.get("studentId"), courseId: formData.get("courseId") });
    revalidatePath("/admin", "layout");
    return `${student.name} is now enrolled in ${course.title}.`;
  });
}

export async function setCoursePublishedAction(_previous: ActionResult | null, formData: FormData): Promise<ActionResult> {
  return runAction(async () => {
    const actor = requireUser(await getSessionUser());
    await setCoursePublished(actor, { courseId: formData.get("courseId"), published: formData.get("published") });
    revalidatePath("/admin", "layout");
  });
}

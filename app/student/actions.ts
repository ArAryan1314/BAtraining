"use server";

import { revalidatePath } from "next/cache";
import { runAction, type ActionResult } from "@/lib/actions/result";
import { getSessionUser } from "@/services/auth";
import { requireUser } from "@/lib/auth/guards";
import { completeLesson } from "@/services/progress/complete-lesson";

export async function completeLessonAction(_previous: ActionResult | null, formData: FormData): Promise<ActionResult> {
  return runAction(async () => {
    const actor = requireUser(await getSessionUser());
    await completeLesson(actor, { courseId: formData.get("courseId"), lessonId: formData.get("lessonId") });
    revalidatePath("/student", "layout");
  });
}

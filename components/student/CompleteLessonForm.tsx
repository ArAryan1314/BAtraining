"use client";

import { useActionState } from "react";
import { CheckCircle2 } from "lucide-react";
import { completeLessonAction } from "@/app/student/actions";
import { Button } from "@/components/ui/Button";

export function CompleteLessonForm({ courseId, lessonId }: { courseId: string; lessonId: string }) {
  const [state, formAction, pending] = useActionState(completeLessonAction, null);

  return (
    <form action={formAction}>
      <input type="hidden" name="courseId" value={courseId} />
      <input type="hidden" name="lessonId" value={lessonId} />
      <Button type="submit" disabled={pending}>
        <CheckCircle2 size={16} /> {pending ? "Saving..." : "Mark as complete"}
      </Button>
      {state && !state.ok && <p role="alert" className="mt-2 text-sm text-danger">{state.message}</p>}
    </form>
  );
}

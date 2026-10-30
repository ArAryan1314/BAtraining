"use client";

import { useActionState } from "react";
import { setCoursePublishedAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";

export function PublishCourseButton({ courseId, published }: { courseId: string; published: boolean }) {
  const [state, formAction, pending] = useActionState(setCoursePublishedAction, null);

  return (
    <form action={formAction}>
      <input type="hidden" name="courseId" value={courseId} />
      <input type="hidden" name="published" value={String(!published)} />
      <Button type="submit" size="sm" variant="outline" disabled={pending}>{published ? "Unpublish" : "Publish"}</Button>
      {state && !state.ok && <p role="alert" className="mt-1 text-xs text-danger">{state.message}</p>}
    </form>
  );
}

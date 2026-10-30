import { notFound } from "next/navigation";
import { LessonEditor } from "@/components/admin/LessonEditor";
import { requireWorkspaceUser } from "@/services/auth";
import { getLessonEditor } from "@/services/cms";

export default async function LessonEditorPage({ params }: { params: Promise<{ courseId: string; lessonId: string }> }) {
  const routeParams = await params;
  const user = await requireWorkspaceUser("ADMIN");
  const lesson = await getLessonEditor(user, routeParams.courseId, routeParams.lessonId);
  if (!lesson) notFound();
  return <LessonEditor lesson={lesson} />;
}

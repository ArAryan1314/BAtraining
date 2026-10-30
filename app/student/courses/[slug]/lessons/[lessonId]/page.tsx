import { notFound } from "next/navigation";
import { LessonView } from "@/components/student/LessonView";
import { requireWorkspaceUser } from "@/services/auth";
import { getLessonView } from "@/services/courses";

export default async function LessonPage({ params }: { params: Promise<{ slug: string; lessonId: string }> }) {
  const { slug, lessonId } = await params;
  const user = await requireWorkspaceUser("STUDENT");
  const view = await getLessonView(user, slug, lessonId);
  if (!view) notFound();
  return <LessonView view={view} />;
}

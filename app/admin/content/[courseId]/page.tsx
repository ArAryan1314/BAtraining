import { notFound } from "next/navigation";
import { CourseEditor } from "@/components/admin/CourseEditor";
import { requireWorkspaceUser } from "@/services/auth";
import { getCourseEditor } from "@/services/cms";

export default async function CourseEditorPage({ params }: { params: Promise<{ courseId: string }> }) {
  const routeParams = await params;
  const user = await requireWorkspaceUser("ADMIN");
  const course = await getCourseEditor(user, routeParams.courseId);
  if (!course) notFound();
  return <CourseEditor course={course} />;
}

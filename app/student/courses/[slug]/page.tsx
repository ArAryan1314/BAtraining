import { notFound } from "next/navigation";
import { CourseOutline } from "@/components/student/CourseOutline";
import { requireWorkspaceUser } from "@/services/auth";
import { getCourseOutline } from "@/services/courses";

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const user = await requireWorkspaceUser("STUDENT");
  const course = await getCourseOutline(user, slug);
  if (!course) notFound();
  return <CourseOutline course={course} />;
}

import { MyCourses } from "@/components/student/MyCourses";
import { requireWorkspaceUser } from "@/services/auth";
import { listMyCourses } from "@/services/courses";

export default async function MyCoursesPage() {
  const user = await requireWorkspaceUser("STUDENT");
  return <MyCourses courses={await listMyCourses(user)} />;
}

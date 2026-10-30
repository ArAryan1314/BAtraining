import { AdminCourses } from "@/components/admin/AdminCourses";
import { requireWorkspaceUser } from "@/services/auth";
import { listCoursesForAdmin } from "@/services/cms";
import { listUsers } from "@/services/users";

export default async function AdminCoursesPage() {
  const user = await requireWorkspaceUser("ADMIN");
  const [courses, students] = await Promise.all([listCoursesForAdmin(user), listUsers(user, "STUDENT")]);
  return <AdminCourses courses={courses} students={students} />;
}

import { StudentProjects } from "@/components/student/StudentProjects";
import { requireWorkspaceUser } from "@/services/auth";
import { listStudentProjects } from "@/services/projects";

export default async function StudentProjectsPage() {
  const user = await requireWorkspaceUser("STUDENT");
  return <StudentProjects projects={await listStudentProjects(user, user.id)} />;
}

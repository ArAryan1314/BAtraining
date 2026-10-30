import { StudentDashboard } from "@/components/dashboard/StudentDashboard";
import { requireWorkspaceUser } from "@/services/auth";
import { getStudentDashboard } from "@/services/dashboards";

export default async function StudentDashboardPage() {
  const user = await requireWorkspaceUser("STUDENT");
  return <StudentDashboard data={await getStudentDashboard(user)} />;
}

import { AdminAssessments } from "@/components/admin/AdminAssessments";
import { requireWorkspaceUser } from "@/services/auth";
import { listAssessmentsForAdmin } from "@/services/assessments";

export default async function AdminAssessmentsPage() {
  const user = await requireWorkspaceUser("ADMIN");
  return <AdminAssessments courses={await listAssessmentsForAdmin(user)} />;
}

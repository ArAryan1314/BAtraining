import { StudentAssessments } from "@/components/student/StudentAssessments";
import { requireWorkspaceUser } from "@/services/auth";
import { listMyAssessments } from "@/services/assessments";

export default async function StudentAssessmentsPage() {
  const user = await requireWorkspaceUser("STUDENT");
  return <StudentAssessments data={await listMyAssessments(user)} />;
}

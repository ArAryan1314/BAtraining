import { TrainerAssessments } from "@/components/trainer/TrainerAssessments";
import { requireWorkspaceUser } from "@/services/auth";
import { getGradingWorkspace } from "@/services/assessments";

export default async function TrainerAssessmentsPage() {
  const user = await requireWorkspaceUser("TRAINER");
  return <TrainerAssessments data={await getGradingWorkspace(user)} />;
}

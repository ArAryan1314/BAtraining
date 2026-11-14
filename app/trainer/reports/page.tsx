import { TrainerReports } from "@/components/trainer/TrainerReports";
import { requireWorkspaceUser } from "@/services/auth";
import { getLearnerReport } from "@/services/reports";

export default async function TrainerReportsPage() {
  const user = await requireWorkspaceUser("TRAINER");
  return <TrainerReports learners={await getLearnerReport(user)} />;
}

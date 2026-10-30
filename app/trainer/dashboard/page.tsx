import { TrainerDashboard } from "@/components/trainer/TrainerDashboard";
import { requireWorkspaceUser } from "@/services/auth";
import { getTrainerDashboard } from "@/services/dashboards";

export default async function TrainerDashboardPage() {
  const user = await requireWorkspaceUser("TRAINER");
  return <TrainerDashboard data={await getTrainerDashboard(user)} />;
}

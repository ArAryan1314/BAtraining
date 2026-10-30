import { TrainerCohorts } from "@/components/trainer/TrainerCohorts";
import { requireWorkspaceUser } from "@/services/auth";
import { getCohortWorkspace } from "@/services/cohorts";

export default async function TrainerCohortsPage() {
  const user = await requireWorkspaceUser("TRAINER");
  return <TrainerCohorts data={await getCohortWorkspace(user)} />;
}

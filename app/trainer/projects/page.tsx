import { TrainerProjects } from "@/components/trainer/TrainerProjects";
import { requireWorkspaceUser } from "@/services/auth";
import { listProjectReviewQueue } from "@/services/projects";

export default async function TrainerProjectsPage() {
  const user = await requireWorkspaceUser("TRAINER");
  return <TrainerProjects submissions={await listProjectReviewQueue(user)} />;
}

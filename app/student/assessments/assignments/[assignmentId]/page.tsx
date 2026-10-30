import { notFound } from "next/navigation";
import { AssignmentView } from "@/components/student/AssignmentView";
import { requireWorkspaceUser } from "@/services/auth";
import { getAssignmentToSubmit } from "@/services/assessments";

export default async function AssignmentViewPage({ params }: { params: Promise<{ assignmentId: string }> }) {
  const routeParams = await params;
  const user = await requireWorkspaceUser("STUDENT");
  const assignment = await getAssignmentToSubmit(user, routeParams.assignmentId);
  if (!assignment) notFound();
  return <AssignmentView assignment={assignment} />;
}

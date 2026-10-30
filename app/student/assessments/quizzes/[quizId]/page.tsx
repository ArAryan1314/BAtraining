import { notFound } from "next/navigation";
import { QuizView } from "@/components/student/QuizView";
import { requireWorkspaceUser } from "@/services/auth";
import { getQuizToTake } from "@/services/assessments";

export default async function QuizViewPage({ params }: { params: Promise<{ quizId: string }> }) {
  const routeParams = await params;
  const user = await requireWorkspaceUser("STUDENT");
  const quiz = await getQuizToTake(user, routeParams.quizId);
  if (!quiz) notFound();
  return <QuizView quiz={quiz} />;
}

import { notFound } from "next/navigation";
import { QuizEditor } from "@/components/admin/QuizEditor";
import { requireWorkspaceUser } from "@/services/auth";
import { getQuizForEditing } from "@/services/assessments";

export default async function QuizEditorPage({ params }: { params: Promise<{ quizId: string }> }) {
  const routeParams = await params;
  const user = await requireWorkspaceUser("ADMIN");
  const quiz = await getQuizForEditing(user, routeParams.quizId);
  if (!quiz) notFound();
  return <QuizEditor quiz={quiz} />;
}

import { submitQuizAction } from "@/app/student/actions";
import { ActionForm } from "@/components/common/ActionForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui";
import type { getQuizToTake } from "@/services/assessments";

export function QuizView({ quiz }: { quiz: NonNullable<Awaited<ReturnType<typeof getQuizToTake>>> }) {
  const summary = `${quiz.course.title} · Pass mark ${quiz.passScore}%${quiz.bestScore === null ? "" : ` · Your best score: ${quiz.bestScore}%`}`;
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader eyebrow="Quiz" title={quiz.title} description={summary} />
      <Card className="p-5 sm:p-6">
        <ActionForm action={submitQuizAction} submitLabel="Submit answers" hidden={{ quizId: quiz.id }} resetOnSuccess className="space-y-6">
          {quiz.questions.map((question, index) => (
            <fieldset key={question.id}>
              <legend className="font-medium">{index + 1}. {question.prompt}</legend>
              <div className="mt-3 space-y-2">
                {question.options.map((option) => (
                  <label key={option} className="flex cursor-pointer items-center gap-3 rounded-lg border border-line px-4 py-3 text-sm has-[:checked]:border-primary-400 has-[:checked]:bg-primary-50">
                    <input type="radio" name={`answer:${question.id}`} value={option} required className="accent-primary-600" />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </ActionForm>
      </Card>
    </div>
  );
}

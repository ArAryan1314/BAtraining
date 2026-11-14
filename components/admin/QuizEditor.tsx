import { addQuestionAction, deleteQuestionAction } from "@/app/admin/actions";
import { ActionForm } from "@/components/common/ActionForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Card, Input, Textarea } from "@/components/ui";
import type { getQuizForEditing } from "@/services/assessments";

export function QuizEditor({ quiz }: { quiz: NonNullable<Awaited<ReturnType<typeof getQuizForEditing>>> }) {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Assessments", href: "/admin/assessments" }, { label: quiz.title }]} />
      <PageHeader eyebrow="Quiz" title={quiz.title} description={`${quiz.course.title} · Pass mark ${quiz.passScore}%`} />
      {quiz.questions.map((question, index) => (
        <Card key={question.id} className="p-5">
          <h2 className="font-semibold">{index + 1}. {question.prompt}</h2>
          <ul className="mt-3 space-y-1 text-sm">
            {question.options.map((option) => <li key={option} className={option === question.answer ? "font-semibold text-success" : "text-ink-700"}>{option}{option === question.answer ? " (correct)" : ""}</li>)}
          </ul>
          <p className="mt-2 text-xs text-ink-500">{question.points} points</p>
          <ActionForm action={deleteQuestionAction} submitLabel="Delete question" variant="ghost" size="sm" hidden={{ questionId: question.id }} confirmMessage="Delete this question?" className="mt-3" />
        </Card>
      ))}
      <Card className="p-5">
        <h2 className="font-semibold">Add a question</h2>
        <ActionForm action={addQuestionAction} submitLabel="Add question" hidden={{ quizId: quiz.id }} resetOnSuccess className="mt-4">
          <Input id="prompt" name="prompt" label="Question" required />
          <Textarea id="options" name="options" label="Answer options" hint="One per line. At least two." rows={4} required />
          <Input id="answer" name="answer" label="Correct answer" hint="Must exactly match one of the options." required />
          <Input id="points" name="points" label="Points" type="number" min={1} defaultValue={1} required className="max-w-40" />
        </ActionForm>
      </Card>
    </div>
  );
}

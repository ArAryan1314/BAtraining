import { ClipboardCheck } from "lucide-react";
import { gradeAssignmentAction } from "@/app/trainer/actions";
import { ActionForm } from "@/components/common/ActionForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge, Card, EmptyState, Input, Table, Textarea } from "@/components/ui";
import { formatDate } from "@/lib/format";
import type { getGradingWorkspace } from "@/services/assessments";

export function TrainerAssessments({ data: { pending, attempts } }: { data: Awaited<ReturnType<typeof getGradingWorkspace>> }) {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Assessments" title="Grading" description="Assignments waiting for you, from learners in your cohorts. Quizzes grade themselves." />
      {pending.length ? pending.map((submission) => (
        <Card key={submission.id} className="p-5">
          <h2 className="font-semibold">{submission.assignment.title}</h2>
          <p className="mt-1 text-sm text-ink-500">{submission.student.name} · {submission.assignment.course.title} · Submitted {formatDate(submission.submittedAt)}</p>
          <p className="mt-4 whitespace-pre-wrap rounded-lg bg-surface-muted p-4 text-sm leading-6 text-ink-700">{submission.content}</p>
          <ActionForm action={gradeAssignmentAction} submitLabel="Save grade" hidden={{ submissionId: submission.id }} className="mt-4">
            <Input id={`score-${submission.id}`} name="score" label={`Score (out of ${submission.assignment.points})`} type="number" min={0} max={submission.assignment.points} step="any" required className="max-w-40" />
            <Textarea id={`feedback-${submission.id}`} name="feedback" label="Feedback (optional)" rows={3} />
          </ActionForm>
        </Card>
      )) : <EmptyState icon={ClipboardCheck} title="Nothing to grade" description="New assignment submissions will appear here." />}
      <section className="space-y-3">
        <h2 className="font-semibold">Recent quiz attempts</h2>
        {attempts.length ? (
          <Table
            headers={["Learner", "Quiz", "Score", "Date"]}
            rows={attempts.map((attempt) => [
              attempt.student.name,
              attempt.quiz.title,
              <Badge key="score" tone={(attempt.score ?? 0) >= attempt.quiz.passScore ? "success" : "warning"}>{attempt.score ?? 0}%</Badge>,
              formatDate(attempt.completedAt),
            ])}
          />
        ) : (
          <p className="text-sm text-ink-500">No quiz attempts yet.</p>
        )}
      </section>
    </div>
  );
}

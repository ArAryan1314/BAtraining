import { submitAssignmentAction } from "@/app/student/actions";
import { ActionForm } from "@/components/common/ActionForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge, Card, Textarea } from "@/components/ui";
import { formatDate } from "@/lib/format";
import type { getAssignmentToSubmit } from "@/services/assessments";

export function AssignmentView({ assignment }: { assignment: NonNullable<Awaited<ReturnType<typeof getAssignmentToSubmit>>> }) {
  const submission = assignment.submissions[0];
  const graded = submission && submission.score !== null;
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader eyebrow="Assignment" title={assignment.title} description={`${assignment.course.title} · ${assignment.points} points${assignment.dueAt ? ` · Due ${formatDate(assignment.dueAt)}` : ""}`} />
      <Card className="p-5 sm:p-6">
        <h2 className="font-semibold">Instructions</h2>
        <p className="mt-2 whitespace-pre-wrap leading-7 text-ink-700">{assignment.instructions}</p>
      </Card>
      <Card className="p-5 sm:p-6">
        {graded ? (
          <div className="space-y-3">
            <Badge tone="success">{submission.score} of {assignment.points} points</Badge>
            {submission.feedback && <p className="text-sm leading-6 text-ink-700"><span className="font-semibold">Feedback: </span>{submission.feedback}</p>}
            <h2 className="pt-2 font-semibold">Your answer</h2>
            <p className="whitespace-pre-wrap text-sm leading-6 text-ink-700">{submission.content}</p>
          </div>
        ) : (
          <ActionForm action={submitAssignmentAction} submitLabel={submission ? "Update answer" : "Submit answer"} hidden={{ assignmentId: assignment.id }}>
            <Textarea id="content" name="content" label="Your answer" defaultValue={submission?.content} hint={submission ? "Submitted. You can update it until it's graded." : undefined} required rows={10} />
          </ActionForm>
        )}
      </Card>
    </div>
  );
}

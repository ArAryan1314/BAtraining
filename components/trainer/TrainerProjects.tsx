import { FolderKanban } from "lucide-react";
import { reviewProjectAction } from "@/app/trainer/actions";
import { ActionForm } from "@/components/common/ActionForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, EmptyState, Select, Textarea } from "@/components/ui";
import { formatDate } from "@/lib/format";
import type { listProjectReviewQueue } from "@/services/projects";

const decisions = [
  { value: "ACCEPTED", label: "Accept" },
  { value: "CHANGES_REQUESTED", label: "Request changes" },
];

export function TrainerProjects({ submissions }: { submissions: Awaited<ReturnType<typeof listProjectReviewQueue>> }) {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Projects" title="Project reviews" description="Submissions waiting for your review, from learners in your cohorts." />
      {!submissions.length && <EmptyState icon={FolderKanban} title="Nothing to review" description="New project submissions will appear here." />}
      {submissions.map((submission) => (
        <Card key={submission.id} className="p-5">
          <h2 className="font-semibold">{submission.project.title}</h2>
          <p className="mt-1 text-sm text-ink-500">{submission.student.name} · {submission.title} · Submitted {formatDate(submission.submittedAt)}</p>
          {submission.contentUrl && <a href={submission.contentUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-semibold text-primary-700 hover:underline">Open submitted work</a>}
          {submission.notes && <p className="mt-3 whitespace-pre-wrap rounded-lg bg-surface-muted p-4 text-sm leading-6 text-ink-700">{submission.notes}</p>}
          <ActionForm action={reviewProjectAction} submitLabel="Send review" hidden={{ submissionId: submission.id }} className="mt-4">
            <Select id={`decision-${submission.id}`} name="decision" label="Decision" options={decisions} required />
            <Textarea id={`notes-${submission.id}`} name="notes" label="Feedback" rows={3} required />
          </ActionForm>
        </Card>
      ))}
    </div>
  );
}

import { FolderKanban } from "lucide-react";
import { createProjectAction, submitProjectAction } from "@/app/student/actions";
import { ActionForm } from "@/components/common/ActionForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge, Card, EmptyState, Input, Textarea } from "@/components/ui";
import { formatDate } from "@/lib/format";
import type { listStudentProjects } from "@/services/projects";

const statusLabels = { NOT_STARTED: "Not started", IN_PROGRESS: "In progress", REVIEW: "In review", READY: "Ready", COMPLETED: "Accepted" } as const;
const submissionTone = { DRAFT: "neutral", SUBMITTED: "warning", UNDER_REVIEW: "warning", ACCEPTED: "success", CHANGES_REQUESTED: "danger" } as const;
const submissionLabels = { DRAFT: "Draft", SUBMITTED: "Awaiting review", UNDER_REVIEW: "Under review", ACCEPTED: "Accepted", CHANGES_REQUESTED: "Changes requested" } as const;

export function StudentProjects({ projects }: { projects: Awaited<ReturnType<typeof listStudentProjects>> }) {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Projects" title="Your projects" description="Build real work for your portfolio and get feedback from your trainer." />
      <Card className="p-5">
        <h2 className="font-semibold">Start a project</h2>
        <ActionForm action={createProjectAction} submitLabel="Create project" resetOnSuccess className="mt-4">
          <Input id="project-title" name="title" label="Project title" required />
          <Textarea id="project-description" name="description" label="Description (optional)" rows={3} />
        </ActionForm>
      </Card>
      {!projects.length && <EmptyState icon={FolderKanban} title="No projects yet" description="Create your first project above." />}
      {projects.map((project) => (
        <Card key={project.id} className="p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-semibold">{project.title}</h2>
            <Badge tone={project.status === "COMPLETED" ? "success" : "primary"}>{statusLabels[project.status]}</Badge>
          </div>
          {project.description && <p className="mt-2 text-sm text-ink-500">{project.description}</p>}
          {project.submissions.length > 0 && (
            <ul className="mt-4 space-y-2">
              {project.submissions.map((submission) => (
                <li key={submission.id} className="rounded-lg border border-line p-3 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-medium">{submission.title} · {formatDate(submission.submittedAt)}</span>
                    <Badge tone={submissionTone[submission.status]}>{submissionLabels[submission.status]}</Badge>
                  </div>
                  {submission.feedback && <p className="mt-2 text-ink-700"><span className="font-semibold">Feedback: </span>{submission.feedback}</p>}
                </li>
              ))}
            </ul>
          )}
          {project.status !== "COMPLETED" && project.status !== "REVIEW" && (
            <ActionForm action={submitProjectAction} submitLabel="Submit for review" variant="outline" hidden={{ projectId: project.id }} resetOnSuccess className="mt-5 border-t border-line pt-5">
              <Input id={`title-${project.id}`} name="title" label="Submission title" required />
              <Input id={`url-${project.id}`} name="contentUrl" label="Link to your work (optional)" type="url" placeholder="https://" />
              <Textarea id={`notes-${project.id}`} name="notes" label="Notes (optional)" rows={3} />
            </ActionForm>
          )}
        </Card>
      ))}
    </div>
  );
}

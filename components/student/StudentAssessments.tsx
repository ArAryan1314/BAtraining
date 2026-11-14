import Link from "next/link";
import { ClipboardCheck } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge, Card, EmptyState } from "@/components/ui";
import { formatDate } from "@/lib/format";
import type { listMyAssessments } from "@/services/assessments";

const rowClass = "flex items-center justify-between gap-4 rounded-lg border border-line p-4 hover:bg-surface-muted";

export function StudentAssessments({ data: { quizzes, assignments } }: { data: Awaited<ReturnType<typeof listMyAssessments>> }) {
  if (!quizzes.length && !assignments.length) {
    return (
      <div className="space-y-6">
        <PageHeader eyebrow="Assessments" title="Quizzes and assignments" />
        <EmptyState icon={ClipboardCheck} title="Nothing to complete yet" description="Quizzes and assignments from your courses will appear here." />
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Assessments" title="Quizzes and assignments" description="Passing quizzes and submitting assignments counts toward finishing your courses." />
      <Card className="p-5">
        <h2 className="font-semibold">Quizzes</h2>
        <div className="mt-4 space-y-2">
          {quizzes.length ? quizzes.map((quiz) => (
            <Link key={quiz.id} href={`/student/assessments/quizzes/${quiz.id}`} className={rowClass}>
              <div>
                <div className="font-medium">{quiz.title}</div>
                <div className="mt-1 text-xs text-ink-500">{quiz.courseTitle} · Pass mark {quiz.passScore}%</div>
              </div>
              {quiz.bestScore === null ? <Badge tone="primary">Not started</Badge> : <Badge tone={quiz.passed ? "success" : "warning"}>Best {quiz.bestScore}%</Badge>}
            </Link>
          )) : <p className="text-sm text-ink-500">No quizzes yet.</p>}
        </div>
      </Card>
      <Card className="p-5">
        <h2 className="font-semibold">Assignments</h2>
        <div className="mt-4 space-y-2">
          {assignments.length ? assignments.map((assignment) => (
            <Link key={assignment.id} href={`/student/assessments/assignments/${assignment.id}`} className={rowClass}>
              <div>
                <div className="font-medium">{assignment.title}</div>
                <div className="mt-1 text-xs text-ink-500">{assignment.courseTitle}{assignment.dueAt ? ` · Due ${formatDate(assignment.dueAt)}` : ""}</div>
              </div>
              {!assignment.submission ? <Badge tone="primary">To do</Badge> : assignment.submission.score === null ? <Badge tone="warning">Awaiting grade</Badge> : <Badge tone="success">{assignment.submission.score} of {assignment.points}</Badge>}
            </Link>
          )) : <p className="text-sm text-ink-500">No assignments yet.</p>}
        </div>
      </Card>
    </div>
  );
}

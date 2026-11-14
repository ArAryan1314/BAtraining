import { BarChart3 } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState, Table } from "@/components/ui";
import { formatDate } from "@/lib/format";
import type { getLearnerReport } from "@/services/reports";

export function TrainerReports({ learners }: { learners: Awaited<ReturnType<typeof getLearnerReport>> }) {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Reports" title="Learner report" description="Progress for every learner in your cohorts." />
      {learners.length ? (
        <Table
          headers={["Learner", "Courses", "Completed", "Progress", "Quiz average", "Last activity"]}
          rows={learners.map((learner) => [
            <span key="name" className="font-medium text-ink-900">{learner.name}</span>,
            learner.courses,
            learner.completed,
            `${learner.percent}%`,
            learner.quizAverage === null ? "—" : `${learner.quizAverage}%`,
            formatDate(learner.lastActivity, "No activity"),
          ])}
        />
      ) : (
        <EmptyState icon={BarChart3} title="No learners yet" description="Add learners to a cohort to see their progress here." />
      )}
    </div>
  );
}

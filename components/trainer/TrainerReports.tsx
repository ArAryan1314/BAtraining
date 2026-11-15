import { BarChart3, CheckCircle2, Gauge, Users } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { KpiTile } from "@/components/dashboard";
import { Badge, EmptyState, ProgressBar, Table } from "@/components/ui";
import { daysSince, riskOf, type Risk } from "@/lib/analytics/series";
import { formatDate } from "@/lib/format";
import type { getLearnerReport } from "@/services/reports";

const RISK: Record<Risk, { label: string; tone: "success" | "warning" | "danger" | "neutral" }> = {
  "on-track": { label: "On track", tone: "success" },
  slowing: { label: "Slowing", tone: "warning" },
  stalled: { label: "Stalled", tone: "danger" },
  inactive: { label: "Not started", tone: "neutral" },
};

/** Every learner in the trainer's cohorts: a summary on top, then one row each with progress, quiz average and how long they have been quiet. */
export function TrainerReports({ learners }: { learners: Awaited<ReturnType<typeof getLearnerReport>> }) {
  const rows = learners
    .map((learner) => ({ ...learner, risk: riskOf(learner.lastActivity ? daysSince(learner.lastActivity) : null) }))
    .sort((a, b) => ["stalled", "inactive", "slowing", "on-track"].indexOf(a.risk) - ["stalled", "inactive", "slowing", "on-track"].indexOf(b.risk) || a.name.localeCompare(b.name));
  const onTrack = rows.filter((row) => row.risk === "on-track").length;
  const average = rows.length ? Math.round(rows.reduce((sum, row) => sum + row.percent, 0) / rows.length) : 0;
  const needHelp = rows.filter((row) => row.risk === "stalled" || row.risk === "inactive").length;

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Reports" title="Learner report" description="Progress for every learner in your cohorts, with those who need help first." />
      {rows.length ? (
        <>
          <section aria-label="Summary" className="grid gap-4 sm:grid-cols-3">
            <KpiTile label="Learners" value={rows.length} icon={Users} tone="primary" hint={`${onTrack} on track`} />
            <KpiTile label="Average progress" value={`${average}%`} icon={Gauge} tone="emerald" hint="Across all their courses" />
            <KpiTile label="Need help" value={needHelp} icon={needHelp ? BarChart3 : CheckCircle2} tone={needHelp ? "rose" : "emerald"} hint={needHelp ? "Stalled or never started" : "Everyone is moving"} />
          </section>
          <Table
            headers={["Learner", "Status", "Courses", "Progress", "Quiz average", "Last activity"]}
            rows={rows.map((learner) => [
              <span key="name" className="font-medium text-ink-900">{learner.name}</span>,
              <Badge key="risk" tone={RISK[learner.risk].tone}>{RISK[learner.risk].label}</Badge>,
              `${learner.completed}/${learner.courses} finished`,
              <div key="progress" className="flex min-w-40 items-center gap-3"><ProgressBar value={learner.percent} className="flex-1" /><span className="w-10 text-right tabular-nums text-ink-500">{learner.percent}%</span></div>,
              learner.quizAverage === null ? "—" : `${learner.quizAverage}%`,
              formatDate(learner.lastActivity, "No activity"),
            ])}
          />
        </>
      ) : (
        <EmptyState icon={BarChart3} title="No learners yet" description="Add learners to a cohort to see their progress here." />
      )}
    </div>
  );
}

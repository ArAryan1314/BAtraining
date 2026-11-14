import { AlertTriangle, CheckCircle2, Users } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ChartCard, StatCard, WhatsNewCard } from "@/components/dashboard";
import { Badge, Card, EmptyState, ProgressBar } from "@/components/ui";
import type { getTrainerDashboard } from "@/services/dashboards";

/** Trainer view: a triage board. Who needs help comes first, then workload, then course health. */
export function TrainerDashboard({ data }: { data: Awaited<ReturnType<typeof getTrainerDashboard>> }) {
  const allClear = data.stalledCount === 0;
  return (
    <>
      <PageHeader
        tone="dark"
        eyebrow="Trainer workspace"
        title={allClear ? "Everyone is on track" : `${data.stalledCount} learner${data.stalledCount === 1 ? "" : "s"} need you`}
        description={`${data.pendingGrading} submissions waiting for grading across ${data.activeLearners} active learners.`}
      />
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <Card className={allClear ? "border-emerald-200 p-5" : "border-amber-300 p-5"}>
            <div className="flex items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 font-semibold">
                {allClear ? <CheckCircle2 size={18} className="text-emerald-600" /> : <AlertTriangle size={18} className="text-amber-600" />} Needs attention
              </h2>
              <Badge tone={allClear ? "success" : "warning"}>{data.stalledCount} learners</Badge>
            </div>
            <ul className="mt-4 divide-y divide-line">
              {data.stalled.length ? (
                data.stalled.map((learner) => (
                  <li key={learner.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                    <span className="font-medium">{learner.name}</span>
                    <span className="text-ink-500">No activity for {data.stalledAfterDays}+ days</span>
                  </li>
                ))
              ) : (
                <li className="py-2 text-sm text-ink-500">Everyone has been active in the last {data.stalledAfterDays} days.</li>
              )}
            </ul>
          </Card>
          <ChartCard title="Course progress" subtitle="Average completion per course">
            {data.courses.length ? (
              <div className="space-y-4">
                {data.courses.map((course) => (
                  <div key={course.id}>
                    <div className="mb-2 flex justify-between gap-3 text-sm">
                      <span className="font-medium">{course.title}</span>
                      <span className="shrink-0 text-ink-500">{course.percent}% · {course.learners} learners</span>
                    </div>
                    <ProgressBar value={course.percent} />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState icon={Users} title="No enrolled learners yet" />
            )}
          </ChartCard>
        </div>
        <aside className="space-y-4">
          <StatCard label="Pending grading" value={data.pendingGrading} hint="Assignments and project submissions" tone="violet" />
          <StatCard label="Active learners" value={data.activeLearners} tone="blue" />
          <WhatsNewCard />
        </aside>
      </div>
    </>
  );
}

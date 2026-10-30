import { Users } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard, ChartCard } from "@/components/dashboard";
import { Badge, Card, EmptyState, ProgressBar } from "@/components/ui";
import type { getTrainerDashboard } from "@/services/dashboards";

export function TrainerDashboard({ data }: { data: Awaited<ReturnType<typeof getTrainerDashboard>> }) {
  return (
    <>
      <PageHeader eyebrow="Trainer workspace" title="Learner overview" description="See learner health, grading workload, and who needs your attention." />
      <div className="mt-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Active learners" value={data.activeLearners} tone="blue" />
          <StatCard label="Needs attention" value={data.stalledCount} hint={`No activity for ${data.stalledAfterDays} days`} tone="amber" />
          <StatCard label="Pending grading" value={data.pendingGrading} hint="Assignments and project submissions" tone="violet" />
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
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
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Needs attention</h2>
              <Badge tone={data.stalledCount ? "warning" : "success"}>{data.stalledCount} learners</Badge>
            </div>
            <div className="mt-5 space-y-3">
              {data.stalled.length ? (
                data.stalled.map((learner) => <div key={learner.id} className="rounded-lg border border-line p-3 text-sm text-ink-700">{learner.name} has had no activity for {data.stalledAfterDays}+ days</div>)
              ) : (
                <p className="text-sm text-ink-500">Everyone has been active recently.</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

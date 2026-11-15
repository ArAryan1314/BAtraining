import { AlertTriangle, CheckCircle2, ClipboardCheck, MessageSquareText, Users } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { AreaChart, ColumnChart, Donut, RingGauge } from "@/components/charts";
import { ChartCard, FeedbackList, KpiTile, ReviewQueue, WhatsNewCard } from "@/components/dashboard";
import { Badge, Card, EmptyState, ProgressBar } from "@/components/ui";
import type { getTrainerDashboard } from "@/services/dashboards";

type Data = Awaited<ReturnType<typeof getTrainerDashboard>>;

const RISK_LABEL = { "on-track": "On track", slowing: "Slowing (4–6 days quiet)", stalled: "Stalled (7+ days)", inactive: "Never started" } as const;

/** Trainer view: review work first (queue, overdue), then who needs help, then how the cohort is doing. */
export function TrainerDashboard({ data }: { data: Data }) {
  const allClear = data.stalledCount === 0;
  const week = Array.from({ length: data.engagement.series.length }, (_, i) => `${data.engagement.series.length - 1 - i}d ago`).map((label, i, all) => (i === all.length - 1 ? "Today" : label));

  return (
    <div className="space-y-6">
      <PageHeader
        tone="dark"
        eyebrow="Trainer workspace"
        title={data.review.overdue > 0 ? `${data.review.overdue} submission${data.review.overdue === 1 ? "" : "s"} overdue for review` : allClear ? "Everyone is on track" : `${data.stalledCount} learner${data.stalledCount === 1 ? "" : "s"} need you`}
        description={`${data.pendingGrading} waiting for grading · ${data.stalledCount} stalled · ${data.activeLearners} active learners.`}
      />

      <section aria-label="Headline numbers" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiTile label="Active this week" value={data.engagement.activeThisWeek} icon={Users} tone="primary" hint={`of ${data.activeLearners} enrolled learners`} series={data.engagement.series} seriesLabel="Daily learner activity, last 28 days" />
        <KpiTile label="Awaiting review" value={data.pendingGrading} icon={ClipboardCheck} tone={data.review.overdue > 0 ? "rose" : "amber"} hint={data.review.overdue > 0 ? `${data.review.overdue} waiting 3+ days` : "None overdue"} />
        <KpiTile label="Feedback given (30 days)" value={data.review.reviewedLast30Days} icon={MessageSquareText} tone="violet" hint={data.review.averageScore === null ? "No scored feedback yet" : `Average score ${data.review.averageScore}%`} />
        <Card className="flex items-center gap-5 p-5">
          <RingGauge percent={data.averageProgress} caption="progress" label={`Average learner progress ${data.averageProgress} percent`} tone="emerald" size={92} />
          <div className="text-sm"><div className="font-medium text-ink-500">Average progress</div><div className="mt-1 text-xs text-ink-500">Across your active learners</div></div>
        </Card>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
        <ChartCard title="Review queue" subtitle="Oldest first — the longer it waits, the more it costs the learner" action={data.pendingGrading > data.review.queue.length ? <Badge tone="neutral">Showing {data.review.queue.length} of {data.pendingGrading}</Badge> : undefined}>
          <ReviewQueue items={data.review.queue} />
        </ChartCard>
        <ChartCard title="Learner engagement" subtitle={`Activity per day, last 28 days · ${data.engagement.trend.change === null ? "no earlier period to compare" : `${data.engagement.trend.change >= 0 ? "+" : ""}${data.engagement.trend.change}% vs the 14 days before`}`}>
          <AreaChart label="Daily learner activity over the last 28 days" labels={week} series={[{ name: "Activity", values: data.engagement.series, tone: "primary" }]} />
        </ChartCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <Card className={allClear ? "border-emerald-200 p-5 sm:p-6" : "border-amber-300 p-5 sm:p-6"}>
          <div className="flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 font-semibold">{allClear ? <CheckCircle2 size={18} className="text-emerald-600" /> : <AlertTriangle size={18} className="text-amber-600" />} Needs attention</h2>
            <Badge tone={allClear ? "success" : "warning"}>{data.stalledCount} stalled</Badge>
          </div>
          <ul className="mt-4 divide-y divide-line">
            {data.atRisk.length ? (
              data.atRisk.map((learner) => (
                <li key={learner.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                  <span className="font-medium">{learner.name}</span>
                  <span className="text-ink-500">{learner.daysIdle === null ? "Never started" : `Quiet for ${learner.daysIdle} days`} · {learner.percent}%</span>
                </li>
              ))
            ) : (
              <li className="py-2 text-sm text-ink-500">Everyone has been active in the last {data.stalledAfterDays} days.</li>
            )}
          </ul>
        </Card>
        <ChartCard title="Learner health" subtitle="By days since their last activity">
          <Donut label="Learners by activity status" segments={(Object.keys(RISK_LABEL) as (keyof typeof RISK_LABEL)[]).map((key) => ({ label: RISK_LABEL[key], value: data.risk[key] }))} centre={{ value: data.activeLearners, caption: "learners" }} />
        </ChartCard>
        <ChartCard title="Quiz results" subtitle="Your learners' scores, grouped by range">
          <ColumnChart label="Quiz scores grouped by range" buckets={data.quizDistribution} tone="emerald" />
        </ChartCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
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
        <div className="space-y-6">
          <ChartCard title="Top of the class" subtitle="Furthest through their courses">
            <ol className="space-y-3">
              {data.topLearners.map((learner, index) => (
                <li key={learner.id} className="flex items-center gap-3 text-sm">
                  <span className="grid h-6 w-6 place-items-center rounded-md bg-primary-50 text-xs font-semibold text-primary-700">{index + 1}</span>
                  <span className="flex-1 truncate font-medium">{learner.name}</span>
                  <span className="tabular-nums text-ink-500">{learner.percent}%</span>
                </li>
              ))}
              {data.topLearners.length === 0 && <li className="text-sm text-ink-500">No learners yet.</li>}
            </ol>
          </ChartCard>
          <ChartCard title="Your recent feedback">
            <FeedbackList empty="You haven't left feedback yet." items={data.review.recent.map((item) => ({ id: item.id, who: item.student, notes: item.notes, score: item.score, at: item.at }))} />
          </ChartCard>
          <WhatsNewCard />
        </div>
      </div>
    </div>
  );
}

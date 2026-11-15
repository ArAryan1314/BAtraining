import Link from "next/link";
import { ArrowUpRight, Award, Banknote, BookOpen, ClipboardCheck, GraduationCap, UserPlus, Users } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { AreaChart, ColumnChart, Donut, FunnelChart, HeatCalendar, RingGauge } from "@/components/charts";
import { ChartCard, KpiTile, WhatsNewCard } from "@/components/dashboard";
import { Badge, Card, ProgressBar } from "@/components/ui";
import { workspaces } from "@/config/navigation";
import { formatDate } from "@/lib/format";
import type { getAdminDashboard } from "@/services/dashboards";

const shortcuts = workspaces.ADMIN.navigation.filter((item) => item.href !== "/admin/dashboard");
const DAY_LABEL = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

/**
 * Admin view: a command centre. Headline numbers each carry their change against the previous 30 days; below
 * them sit the learner journey, delivery quality, review workload, course performance and recent activity.
 */
export function AdminDashboard({ data }: { data: Awaited<ReturnType<typeof getAdminDashboard>> }) {
  const { trends, series, review } = data;
  const days = Array.from({ length: series.activity.length }, (_, i) => DAY_LABEL.format(data.labels.from.getTime() + i * 86_400_000));

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Operations" title="Platform overview" description="Learners, content, reviews and revenue — every figure compared with the 30 days before it." />

      <section aria-label="Headline numbers" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiTile label="Active learners" value={trends.activeLearners.current} icon={Users} tone="primary" showDelta change={trends.activeLearners.change} series={series.activity} seriesLabel="Daily learner activity, last 30 days" />
        <KpiTile label="New enrolments" value={trends.enrolments.current} icon={UserPlus} tone="emerald" showDelta change={trends.enrolments.change} series={series.enrolments} seriesLabel="Daily enrolments, last 30 days" />
        <KpiTile label="Revenue (30 days)" value={money.format(data.revenueTotal30)} icon={Banknote} tone="violet" showDelta change={trends.revenue.change} series={series.revenue} seriesLabel="Daily revenue, last 30 days" />
        <KpiTile label="Awaiting review" value={review.awaiting} icon={ClipboardCheck} tone={review.awaiting > 0 ? "amber" : "emerald"} hint={review.oldestWaitingDays === null ? "Nothing waiting" : `Oldest has waited ${review.oldestWaitingDays} day${review.oldestWaitingDays === 1 ? "" : "s"}`} />
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <ChartCard title="Learner activity" subtitle="Lessons, quizzes, submissions and feedback per day, last 30 days">
          <AreaChart label="Daily learner activity over the last 30 days" labels={days} series={[{ name: "Activity events", values: series.activity, tone: "primary" }]} />
        </ChartCard>
        <ChartCard title="Learner journey" subtitle="Where learners are across the whole programme">
          <FunnelChart stages={data.funnel} />
        </ChartCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <ChartCard title="Review and feedback" subtitle="Grading workload and how quickly it is cleared">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Metric label="Assignments waiting" value={review.assignmentsAwaiting} />
            <Metric label="Projects waiting" value={review.projectsAwaiting} />
            <Metric label="Graded, last 30 days" value={review.gradedLast30Days} />
            <Metric label="Feedback notes, last 30 days" value={review.feedbackLast30Days} />
          </div>
          <div className="mt-5 flex items-center justify-between rounded-md bg-ink-50 p-4 text-sm">
            <span className="text-ink-600">Average feedback score</span>
            <span className="text-xl font-semibold tabular-nums">{review.averageFeedbackScore === null ? "—" : `${review.averageFeedbackScore}%`}</span>
          </div>
        </ChartCard>
        <ChartCard title="Quiz results" subtitle={data.quizAverage === null ? "No quiz attempts yet" : `${data.quizAttempts} attempts · ${data.quizAverage}% average`}>
          <ColumnChart label="Quiz scores grouped by range" buckets={data.quizDistribution} tone="emerald" />
        </ChartCard>
        <ChartCard title="Completion" subtitle="Average progress across every enrolment">
          <div className="flex flex-col items-center gap-5 sm:flex-row">
            <RingGauge percent={data.averageCompletion} caption="average" label={`Average completion ${data.averageCompletion} percent`} size={128} />
            <dl className="w-full space-y-3 text-sm">
              <Row icon={BookOpen} label="Lessons completed" value={data.lessonsCompleted} />
              <Row icon={GraduationCap} label="Enrolments" value={data.enrollments} />
              <Row icon={Award} label="Certificates issued" value={data.certificates} />
            </dl>
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Course performance" subtitle="Busiest courses first">
        {data.courses.length ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase tracking-wider text-ink-500">
                  <th className="pb-3 pr-4">Course</th>
                  <th className="pb-3 pr-4">Enrolled</th>
                  <th className="pb-3 pr-4">Finished</th>
                  <th className="min-w-44 pb-3 pr-4">Average progress</th>
                  <th className="pb-3">Quiz average</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {data.courses.map((course) => (
                  <tr key={course.id}>
                    <td className="py-3.5 pr-4">
                      <div className="font-medium text-ink-900">{course.title}</div>
                      {!course.published && <Badge>Draft</Badge>}
                    </td>
                    <td className="py-3.5 pr-4 tabular-nums">{course.enrolled}</td>
                    <td className="py-3.5 pr-4 tabular-nums">{course.completed}</td>
                    <td className="py-3.5 pr-4"><div className="flex items-center gap-3"><ProgressBar value={course.percent} className="flex-1" /><span className="w-10 text-right tabular-nums text-ink-500">{course.percent}%</span></div></td>
                    <td className="py-3.5 tabular-nums">{course.quizAverage === null ? "—" : `${course.quizAverage}%`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-ink-500">No courses yet.</p>
        )}
      </ChartCard>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr]">
        <ChartCard title="Activity by day" subtitle="Last 8 weeks, darker is busier">
          <HeatCalendar cells={data.heat} />
        </ChartCard>
        <ChartCard title="People" subtitle={`${data.activeLearnersLast7Days} learners active in the last 7 days`}>
          <Donut label="Accounts by role" segments={data.roles} centre={{ value: data.roles.reduce((total, role) => total + role.value, 0), caption: "accounts" }} />
        </ChartCard>
        <Card className="p-5 sm:p-6">
          <h3 className="font-semibold">Recent admin activity</h3>
          {data.recent.length ? (
            <ul className="mt-4 divide-y divide-line">
              {data.recent.map((entry) => (
                <li key={entry.id} className="py-2.5 text-sm">
                  <div><span className="font-medium">{entry.who}</span> <span className="text-ink-500">{entry.action}</span></div>
                  <div className="text-xs text-ink-400">{entry.record} · {formatDate(entry.at)}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-ink-500">Nothing recorded yet.</p>
          )}
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card className="p-5">
          <h2 className="font-semibold">Jump to</h2>
          <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {shortcuts.map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <Link href={href} className="flex items-center justify-between gap-2 rounded-md border border-line px-3 py-2.5 text-sm font-medium ui-row">
                  <span className="flex items-center gap-2"><Icon size={15} />{label}</span>
                  <ArrowUpRight size={13} className="text-ink-400" />
                </Link>
              </li>
            ))}
          </ul>
        </Card>
        <WhatsNewCard />
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-line p-3.5">
      <div className="text-2xl font-semibold tabular-nums">{value}</div>
      <div className="mt-0.5 text-xs text-ink-500">{label}</div>
    </div>
  );
}

function Row({ icon: Icon, label, value }: { icon: typeof BookOpen; label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="flex items-center gap-2 text-ink-600"><Icon size={15} className="text-ink-400" aria-hidden />{label}</dt>
      <dd className="font-semibold tabular-nums">{value}</dd>
    </div>
  );
}

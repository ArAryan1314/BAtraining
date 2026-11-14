import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ChartCard, StatCard, WhatsNewCard } from "@/components/dashboard";
import { Card } from "@/components/ui";
import { workspaces } from "@/config/navigation";
import type { getAdminDashboard } from "@/services/dashboards";

const shortcuts = workspaces.ADMIN.navigation.filter((item) => item.href !== "/admin/dashboard");

/** Admin view: a command centre with headline numbers, proportional activity bars and shortcuts to every admin area. */
export function AdminDashboard({ data }: { data: Awaited<ReturnType<typeof getAdminDashboard>> }) {
  const activity = [
    { label: "Lessons completed", value: data.lessonsCompleted },
    { label: "Quiz attempts", value: data.quizAttempts },
    { label: "Enrolments", value: data.enrollments },
    { label: "Certificates issued", value: data.certificates },
  ];
  const peak = Math.max(1, ...activity.map((item) => item.value));

  return (
    <>
      <PageHeader eyebrow="Operations" title="Platform overview" description="Learners, content and delivery performance at a glance." />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Students" value={data.students} tone="blue" />
        <StatCard label="Published courses" value={data.publishedCourses} hint={`${data.draftCourses} drafts`} tone="violet" />
        <StatCard label="Average completion" value={`${data.averageCompletion}%`} tone="emerald" />
        <StatCard label="Trainers" value={data.trainers} tone="amber" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <ChartCard title="Platform activity" subtitle="All-time totals, scaled to the busiest metric">
          <ul className="space-y-4">
            {activity.map(({ label, value }) => (
              <li key={label}>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="font-medium">{label}</span>
                  <span className="tabular-nums text-ink-500">{value}</span>
                </div>
                <div className="h-2 rounded-md bg-ink-100">
                  <div className="h-2 rounded-md bg-primary-500" style={{ width: `${(value / peak) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </ChartCard>
        <div className="space-y-6">
          <Card className="p-5">
            <h2 className="font-semibold">Jump to</h2>
            <ul className="mt-3 grid grid-cols-2 gap-2">
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
    </>
  );
}

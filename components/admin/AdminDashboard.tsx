import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard, ChartCard } from "@/components/dashboard";
import type { getAdminDashboard } from "@/services/dashboards";

export function AdminDashboard({ data }: { data: Awaited<ReturnType<typeof getAdminDashboard>> }) {
  const activity = [
    { label: "Enrolments", value: data.enrollments },
    { label: "Lessons completed", value: data.lessonsCompleted },
    { label: "Quiz attempts", value: data.quizAttempts },
    { label: "Certificates issued", value: data.certificates },
  ];

  return (
    <>
      <PageHeader eyebrow="Operations" title="Platform overview" description="Manage learners, training content, assessments, and delivery performance." />
      <div className="mt-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard label="Students" value={data.students} tone="blue" />
          <StatCard label="Courses" value={data.publishedCourses} hint={`${data.draftCourses} drafts`} tone="violet" />
          <StatCard label="Average completion" value={`${data.averageCompletion}%`} tone="emerald" />
          <StatCard label="Trainers" value={data.trainers} tone="amber" />
        </div>
        <ChartCard title="Platform activity" subtitle="All-time totals">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {activity.map(({ label, value }) => (
              <div key={label} className="rounded-xl border border-line p-4">
                <div className="text-sm font-semibold">{label}</div>
                <div className="mt-3 text-2xl font-semibold">{value}</div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </>
  );
}

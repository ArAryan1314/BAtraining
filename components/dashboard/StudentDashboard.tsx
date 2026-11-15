import { BookOpen, CalendarClock, ClipboardList, GraduationCap, ListChecks } from "lucide-react";
import { CourseCard } from "@/components/course/CourseCard";
import { AreaChart, HeatCalendar } from "@/components/charts";
import { ChartCard, FeedbackList, KpiTile } from "@/components/dashboard";
import { ProgressOverview } from "@/components/dashboard/ProgressOverview";
import { WhatsNewCard } from "@/components/dashboard/WhatsNewCard";
import { Badge, EmptyState, SectionHeading } from "@/components/ui";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/format";
import type { getStudentDashboard } from "@/services/dashboards";

type Data = Awaited<ReturnType<typeof getStudentDashboard>>;

/** Learner view: momentum first (progress, streak, activity calendar), then scores, deadlines and feedback, then the courses to continue. */
export function StudentDashboard({ data }: { data: Data }) {
  const { courses, progress, activity, quizzes } = data;
  const [resume, ...others] = [...courses].sort((a, b) => Number(a.completionPercent === 100) - Number(b.completionPercent === 100));
  const passRate = quizzes.recent.length ? Math.round((quizzes.recent.filter((attempt) => attempt.score >= attempt.passScore).length / quizzes.recent.length) * 100) : null;

  return (
    <div className="space-y-8">
      <ProgressOverview progress={progress} />

      <section aria-label="Your numbers" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiTile label="Lessons completed" value={data.lessonsCompleted} icon={ListChecks} tone="primary" showDelta change={activity.trend.change} series={activity.last14Days} seriesLabel="Your activity, last 14 days" />
        <KpiTile label="Quiz average" value={quizzes.average === null ? "—" : `${quizzes.average}%`} icon={GraduationCap} tone="emerald" hint={passRate === null ? "No quizzes taken yet" : `${passRate}% of recent attempts passed`} />
        <KpiTile label="Assignment average" value={data.assignmentAverage === null ? "—" : `${data.assignmentAverage}%`} icon={ClipboardList} tone="violet" hint={data.assignmentAverage === null ? "Nothing graded yet" : "Of the points on offer"} />
        <KpiTile label="Active days" value={activity.activeDays} icon={CalendarClock} tone="amber" hint="In the last 16 weeks" />
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <ChartCard title="Your activity" subtitle="Each square is a day over the last 16 weeks">
          <HeatCalendar cells={activity.grid} unit="activities" />
        </ChartCard>
        <ChartCard title="Quiz scores" subtitle="Your latest attempts, oldest to newest">
          {quizzes.recent.length > 1 ? (
            <AreaChart label="Your recent quiz scores" labels={quizzes.recent.map((attempt) => attempt.title)} series={[{ name: "Score", values: quizzes.recent.map((attempt) => attempt.score), tone: "emerald" }]} />
          ) : (
            <p className="text-sm text-ink-500">Take two or more quizzes to see your trend.</p>
          )}
        </ChartCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Coming up" subtitle="Assignments you haven't submitted yet">
          {data.deadlines.length ? (
            <ul className="divide-y divide-line">
              {data.deadlines.map((assignment) => (
                <li key={assignment.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                  <div className="min-w-0">
                    <div className="truncate font-semibold text-ink-900">{assignment.title}</div>
                    <div className="truncate text-xs text-ink-500">{assignment.course} · {assignment.points} points</div>
                  </div>
                  <div className="shrink-0 text-right">
                    <Badge tone={assignment.overdue ? "danger" : "primary"}>{assignment.overdue ? "Overdue" : "Due"}</Badge>
                    <div className={cn("mt-1 text-xs", assignment.overdue ? "font-semibold text-rose-600" : "text-ink-500")}>{formatDate(assignment.dueAt)}</div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-ink-500">Nothing due. Nice work.</p>
          )}
        </ChartCard>
        <ChartCard title="Feedback from your trainers">
          <FeedbackList empty="Feedback on your work will show up here." items={data.feedback.map((item) => ({ id: item.id, who: item.trainer, notes: item.notes, score: item.score, at: item.at }))} />
        </ChartCard>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_20rem]">
        <section className="space-y-5">
          <SectionHeading eyebrow="My learning" title={resume && resume.completionPercent < 100 ? "Pick up where you left off" : "Your courses"} />
          {resume ? (
            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2"><CourseCard course={resume} /></div>
              {others.map((course) => <CourseCard key={course.id} course={course} />)}
            </div>
          ) : (
            <EmptyState icon={BookOpen} title="No courses yet" description="Your courses will appear here as soon as an advisor enrols you." />
          )}
        </section>
        <aside className="space-y-5 xl:pt-14"><WhatsNewCard /></aside>
      </div>
    </div>
  );
}

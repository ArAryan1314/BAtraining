import { BookOpen } from "lucide-react";
import { CourseCard } from "@/components/course/CourseCard";
import { ProgressOverview } from "@/components/dashboard/ProgressOverview";
import { WhatsNewCard } from "@/components/dashboard/WhatsNewCard";
import { EmptyState, SectionHeading } from "@/components/ui";
import type { getStudentDashboard } from "@/services/dashboards";

/** Learner view: momentum first, then the courses to continue, with release notes in a side rail. */
export function StudentDashboard({ data: { courses, progress } }: { data: Awaited<ReturnType<typeof getStudentDashboard>> }) {
  const [resume, ...others] = [...courses].sort((a, b) => Number(a.completionPercent === 100) - Number(b.completionPercent === 100));
  return (
    <div className="space-y-8">
      <ProgressOverview progress={progress} />
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

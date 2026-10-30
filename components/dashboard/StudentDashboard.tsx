import { BookOpen } from "lucide-react";
import { CourseCard } from "@/components/course/CourseCard";
import { ProgressOverview } from "@/components/dashboard/ProgressOverview";
import { EmptyState, SectionHeading } from "@/components/ui";
import type { getStudentDashboard } from "@/services/dashboards";

export function StudentDashboard({ data: { courses, progress } }: { data: Awaited<ReturnType<typeof getStudentDashboard>> }) {
  return (
    <div className="space-y-8">
      <ProgressOverview progress={progress} />
      <section className="space-y-5">
        <SectionHeading eyebrow="My learning" title="Your courses" />
        {courses.length ? (
          <div className="grid gap-5 lg:grid-cols-3">
            {courses.map((course) => <CourseCard key={course.id} course={course} />)}
          </div>
        ) : (
          <EmptyState icon={BookOpen} title="No courses yet" description="Your courses will appear here as soon as an advisor enrols you." />
        )}
      </section>
    </div>
  );
}

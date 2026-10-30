import { BookOpen } from "lucide-react";
import { CourseCard } from "@/components/course/CourseCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/ui";
import type { Course } from "@/types/course";

export function MyCourses({ courses }: { courses: Course[] }) {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="My learning" title="Your courses" description="Pick up where you left off." />
      {courses.length ? (
        <div className="grid gap-5 lg:grid-cols-3">
          {courses.map((course) => <CourseCard key={course.id} course={course} />)}
        </div>
      ) : (
        <EmptyState icon={BookOpen} title="No courses yet" description="Your courses will appear here as soon as an advisor enrols you." />
      )}
    </div>
  );
}

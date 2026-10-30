import Link from "next/link";
import { CheckCircle2, Circle } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Card, ProgressBar } from "@/components/ui";
import type { getCourseOutline } from "@/services/courses";

export function CourseOutline({ course }: { course: NonNullable<Awaited<ReturnType<typeof getCourseOutline>>> }) {
  const lessonHref = (lessonId: string) => `/student/courses/${course.slug}/lessons/${lessonId}`;
  const resumeId = course.nextLessonId ?? course.firstLessonId;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Course"
        title={course.title}
        description={course.description}
        action={resumeId ? <ButtonLink href={lessonHref(resumeId)}>{course.percent === 0 ? "Start course" : course.nextLessonId ? "Continue" : "Review"}</ButtonLink> : undefined}
      />
      <Card className="p-5">
        <ProgressBar value={course.percent} showLabel />
      </Card>
      {course.modules.map((module, index) => (
        <Card key={module.id} className="p-5">
          <h2 className="font-semibold">{index + 1}. {module.title}</h2>
          <ul className="mt-4 space-y-1">
            {module.lessons.map((lesson) => (
              <li key={lesson.id}>
                <Link href={lessonHref(lesson.id)} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink-700 hover:bg-surface-muted">
                  {lesson.completed ? <CheckCircle2 size={17} className="shrink-0 text-success" aria-label="Completed" /> : <Circle size={17} className="shrink-0 text-ink-400" aria-label="Not completed" />}
                  {lesson.title}
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}

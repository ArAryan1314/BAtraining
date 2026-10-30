import { CheckCircle2, ExternalLink } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui";
import type { getLessonView } from "@/services/courses";
import { completeLessonAction } from "@/app/student/actions";
import { ActionForm } from "@/components/common/ActionForm";

type Lesson = NonNullable<Awaited<ReturnType<typeof getLessonView>>>;

function LessonBlock({ block }: { block: Lesson["blocks"][number] }) {
  if (block.type === "CALLOUT") {
    return (
      <div className="rounded-xl border border-primary-100 bg-primary-50 p-4">
        <div className="text-sm font-semibold text-primary-700">{block.title}</div>
        <p className="mt-1 text-sm leading-6 text-ink-700">{block.text}</p>
      </div>
    );
  }
  if (block.type === "TEXT") {
    return (
      <div>
        <h2 className="font-semibold">{block.title}</h2>
        <p className="mt-2 leading-7 text-ink-700">{block.text}</p>
      </div>
    );
  }
  if (block.url) {
    return (
      <a href={block.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:underline">
        {block.title} <ExternalLink size={14} />
      </a>
    );
  }
  return null;
}

export function LessonView({ view }: { view: Lesson }) {
  const { course, lesson, blocks, resources, previousLessonId, nextLessonId } = view;
  const lessonHref = (lessonId: string) => `/student/courses/${course.slug}/lessons/${lessonId}`;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Breadcrumb items={[{ label: "My Learning", href: "/student/courses" }, { label: course.title, href: `/student/courses/${course.slug}` }, { label: lesson.title }]} />
      <Card className="space-y-6 p-6 sm:p-8">
        <h1 className="text-2xl font-black tracking-tight">{lesson.title}</h1>
        {blocks.length ? blocks.map((block) => <LessonBlock key={block.id} block={block} />) : <p className="text-sm text-ink-500">Content for this lesson is on its way.</p>}
        {resources.length > 0 && (
          <div>
            <h2 className="font-semibold">Resources</h2>
            <ul className="mt-2 space-y-1">
              {resources.map((resource) => (
                <li key={resource.id}>
                  <a href={resource.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:underline">
                    {resource.title} <ExternalLink size={14} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="border-t border-line pt-5">
          {lesson.completed ? (
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-success"><CheckCircle2 size={17} /> Completed</p>
          ) : (
            <ActionForm action={completeLessonAction} submitLabel="Mark as complete" hidden={{ courseId: course.id, lessonId: lesson.id }} />
          )}
        </div>
      </Card>
      <div className="flex justify-between gap-3">
        {previousLessonId ? <ButtonLink href={lessonHref(previousLessonId)} variant="outline">Previous lesson</ButtonLink> : <span />}
        {nextLessonId ? <ButtonLink href={lessonHref(nextLessonId)}>Next lesson</ButtonLink> : <ButtonLink href={`/student/courses/${course.slug}`} variant="outline">Back to course</ButtonLink>}
      </div>
    </div>
  );
}

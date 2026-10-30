import Link from "next/link";
import { addLessonAction, addModuleAction, deleteLessonAction, deleteModuleAction, publishCourseContentAction, updateCourseAction } from "@/app/admin/actions";
import { ActionForm } from "@/components/common/ActionForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Card, Input } from "@/components/ui";
import type { getCourseEditor } from "@/services/cms";
import { ContentCourseFields } from "./ContentCourseFields";

export function CourseEditor({ course }: { course: NonNullable<Awaited<ReturnType<typeof getCourseEditor>>> }) {
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Content", href: "/admin/content" }, { label: course.title }]} />
      <PageHeader eyebrow="Course editor" title={course.title} description={course.published ? "Published. Publish a course or take it offline under Courses." : "Not published yet. Publish it under Courses when it's ready."} />
      {course.hasDraft && (
        <Card className="p-5">
          <h2 className="font-semibold">You have unpublished lesson changes</h2>
          <p className="mt-1 text-sm text-ink-500">Students still see the last published content.</p>
          <ActionForm action={publishCourseContentAction} submitLabel="Publish content" hidden={{ courseId: course.id }} className="mt-4" />
        </Card>
      )}
      {course.modules.map((module, index) => (
        <Card key={module.id} className="p-5">
          <div className="flex items-start justify-between gap-3">
            <h2 className="font-semibold">{index + 1}. {module.title}</h2>
            {!module.lessons.length && <ActionForm action={deleteModuleAction} submitLabel="Delete module" variant="ghost" size="sm" hidden={{ moduleId: module.id }} confirmMessage={`Delete ${module.title}?`} />}
          </div>
          <ul className="mt-3 space-y-2">
            {module.lessons.map((lesson) => (
              <li key={lesson.id} className="flex items-center justify-between gap-3 rounded-lg border border-line p-3 text-sm">
                <Link href={`/admin/content/${course.id}/lessons/${lesson.id}`} className="font-medium text-primary-700 hover:underline">{lesson.title}</Link>
                <ActionForm action={deleteLessonAction} submitLabel="Delete" variant="ghost" size="sm" hidden={{ lessonId: lesson.id }} confirmMessage={`Delete ${lesson.title}?`} />
              </li>
            ))}
          </ul>
          <ActionForm action={addLessonAction} submitLabel="Add lesson" variant="outline" size="sm" hidden={{ moduleId: module.id }} resetOnSuccess className="mt-4">
            <Input id={`lesson-${module.id}`} name="title" label="New lesson title" required />
          </ActionForm>
        </Card>
      ))}
      <Card className="p-5">
        <h2 className="font-semibold">Add a module</h2>
        <ActionForm action={addModuleAction} submitLabel="Add module" hidden={{ courseId: course.id }} resetOnSuccess className="mt-4">
          <Input id="module-title" name="title" label="Module title" required />
        </ActionForm>
      </Card>
      <Card className="p-5">
        <h2 className="font-semibold">Course details</h2>
        <ActionForm action={updateCourseAction} submitLabel="Save details" hidden={{ courseId: course.id }} className="mt-4">
          <ContentCourseFields course={course} />
        </ActionForm>
      </Card>
    </div>
  );
}

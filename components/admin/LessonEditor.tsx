import { addLessonResourceAction, deleteLessonResourceAction, saveLessonContentAction } from "@/app/admin/actions";
import { ActionForm } from "@/components/common/ActionForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Card, Input, Textarea } from "@/components/ui";
import type { getLessonEditor } from "@/services/cms";

export function LessonEditor({ lesson }: { lesson: NonNullable<Awaited<ReturnType<typeof getLessonEditor>>> }) {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Breadcrumb items={[{ label: "Content", href: "/admin/content" }, { label: lesson.courseTitle, href: `/admin/content/${lesson.courseId}` }, { label: lesson.title }]} />
      <PageHeader eyebrow="Lesson editor" title={lesson.title} description="Changes are saved as a draft. Publish them from the course page." />
      <Card className="p-5">
        <ActionForm action={saveLessonContentAction} submitLabel="Save draft" hidden={{ courseId: lesson.courseId, lessonId: lesson.id }}>
          <Textarea id="overview" name="overview" label="Lesson text" defaultValue={lesson.overview} rows={10} />
          <Input id="videoUrl" name="videoUrl" label="Video link (optional)" type="url" placeholder="https://" defaultValue={lesson.videoUrl} />
          <Textarea id="takeaway" name="takeaway" label="Key takeaway (optional)" defaultValue={lesson.takeaway} rows={2} />
        </ActionForm>
      </Card>
      <Card className="p-5">
        <h2 className="font-semibold">Resources</h2>
        <p className="mt-1 text-sm text-ink-500">Links appear to students straight away.</p>
        <ul className="mt-3 space-y-2">
          {lesson.resources.map((resource) => (
            <li key={resource.id} className="flex items-center justify-between gap-3 rounded-lg border border-line p-3 text-sm">
              <a href={resource.url} target="_blank" rel="noreferrer" className="font-medium text-primary-700 hover:underline">{resource.title}</a>
              <ActionForm action={deleteLessonResourceAction} submitLabel="Remove" variant="ghost" size="sm" hidden={{ resourceId: resource.id }} />
            </li>
          ))}
        </ul>
        <ActionForm action={addLessonResourceAction} submitLabel="Add resource" variant="outline" hidden={{ lessonId: lesson.id }} resetOnSuccess className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input id="resource-title" name="title" label="Title" required />
            <Input id="resource-url" name="url" label="Link" type="url" placeholder="https://" required />
          </div>
        </ActionForm>
      </Card>
    </div>
  );
}

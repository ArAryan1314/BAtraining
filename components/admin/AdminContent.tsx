import Link from "next/link";
import { createCourseAction } from "@/app/admin/actions";
import { ActionForm } from "@/components/common/ActionForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge, Card } from "@/components/ui";
import type { listCoursesForAdmin } from "@/services/cms";
import { ContentCourseFields } from "./ContentCourseFields";

export function AdminContent({ courses }: { courses: Awaited<ReturnType<typeof listCoursesForAdmin>> }) {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Content" title="Course content" description="Create courses and write their modules and lessons." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="font-semibold">Your courses</h2>
          <div className="mt-4 space-y-2">
            {courses.map((course) => (
              <Link key={course.id} href={`/admin/content/${course.id}`} className="flex items-center justify-between gap-3 rounded-lg border border-line p-3 text-sm hover:bg-surface-muted">
                <span className="font-medium">{course.title}</span>
                <span className="flex items-center gap-2 text-xs text-ink-500">{course._count.modules} modules <Badge tone={course.published ? "success" : "neutral"}>{course.published ? "Published" : "Draft"}</Badge></span>
              </Link>
            ))}
            {!courses.length && <p className="text-sm text-ink-500">No courses yet.</p>}
          </div>
        </Card>
        <Card className="p-5">
          <h2 className="font-semibold">New course</h2>
          <ActionForm action={createCourseAction} submitLabel="Create course" className="mt-4">
            <ContentCourseFields />
          </ActionForm>
        </Card>
      </div>
    </div>
  );
}

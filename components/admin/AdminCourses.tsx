import { enrollStudentAction, setCoursePublishedAction } from "@/app/admin/actions";
import { ActionForm } from "@/components/common/ActionForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge, Card, Select, Table } from "@/components/ui";
import type { listCoursesForAdmin } from "@/services/cms";

export function AdminCourses({ courses, students }: { courses: Awaited<ReturnType<typeof listCoursesForAdmin>>; students: { id: string; name: string; email: string }[] }) {
  const publishedCourses = courses.filter((course) => course.published);
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Courses" title="Courses" description="Publish courses and enrol students. Edit course content under Content." />
      <Card className="p-5">
        <h2 className="font-semibold">Enrol a student</h2>
        {students.length && publishedCourses.length ? (
          <ActionForm action={enrollStudentAction} submitLabel="Enrol" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Select id="studentId" name="studentId" label="Student" options={students.map((student) => ({ value: student.id, label: `${student.name} (${student.email})` }))} required />
              <Select id="courseId" name="courseId" label="Published course" options={publishedCourses.map((course) => ({ value: course.id, label: course.title }))} required />
            </div>
          </ActionForm>
        ) : (
          <p className="mt-2 text-sm text-ink-500">You need at least one student and one published course.</p>
        )}
      </Card>
      <Table
        headers={["Course", "Modules", "Learners", "Status", ""]}
        rows={courses.map((course) => [
          <span key="title" className="font-medium text-ink-900">{course.title}</span>,
          course._count.modules,
          course._count.enrollments,
          <Badge key="status" tone={course.published ? "success" : "neutral"}>{course.published ? "Published" : "Draft"}</Badge>,
          <ActionForm key="action" action={setCoursePublishedAction} submitLabel={course.published ? "Unpublish" : "Publish"} variant="outline" size="sm" hidden={{ courseId: course.id, published: String(!course.published) }} />,
        ])}
      />
    </div>
  );
}

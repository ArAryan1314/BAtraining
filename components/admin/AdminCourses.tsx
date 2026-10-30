import { PageHeader } from "@/components/layout/PageHeader";
import { Badge, Table } from "@/components/ui";
import type { listCoursesForAdmin } from "@/services/cms";
import { EnrollStudentForm } from "./EnrollStudentForm";
import { PublishCourseButton } from "./PublishCourseButton";

export function AdminCourses({ courses, students }: { courses: Awaited<ReturnType<typeof listCoursesForAdmin>>; students: { id: string; name: string; email: string }[] }) {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Content" title="Courses" description="Publish courses and enrol students." />
      <EnrollStudentForm
        students={students.map((student) => ({ value: student.id, label: `${student.name} (${student.email})` }))}
        courses={courses.filter((course) => course.published).map((course) => ({ value: course.id, label: course.title }))}
      />
      <Table
        headers={["Course", "Modules", "Learners", "Status", ""]}
        rows={courses.map((course) => [
          <span key="title" className="font-medium text-ink-900">{course.title}</span>,
          course._count.modules,
          course._count.enrollments,
          <Badge key="status" tone={course.published ? "success" : "neutral"}>{course.published ? "Published" : "Draft"}</Badge>,
          <PublishCourseButton key="action" courseId={course.id} published={course.published} />,
        ])}
      />
    </div>
  );
}

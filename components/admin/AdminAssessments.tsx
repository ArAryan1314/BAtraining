import Link from "next/link";
import { createAssignmentAction, createQuizAction } from "@/app/admin/actions";
import { ActionForm } from "@/components/common/ActionForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge, Card, Input, Select, Textarea } from "@/components/ui";
import { formatDate } from "@/lib/format";
import type { listAssessmentsForAdmin } from "@/services/assessments";

export function AdminAssessments({ courses }: { courses: Awaited<ReturnType<typeof listAssessmentsForAdmin>> }) {
  const courseOptions = courses.map((course) => ({ value: course.id, label: course.title }));
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Assessments" title="Quizzes and assignments" description="Everything in a course must be completed for a student to finish it and earn the certificate." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="font-semibold">New quiz</h2>
          <ActionForm action={createQuizAction} submitLabel="Create quiz" resetOnSuccess className="mt-4">
            <Select id="quiz-course" name="courseId" label="Course" options={courseOptions} required />
            <Input id="quiz-title" name="title" label="Title" required />
            <Input id="quiz-pass" name="passScore" label="Pass mark (%)" type="number" min={1} max={100} defaultValue={70} required />
          </ActionForm>
        </Card>
        <Card className="p-5">
          <h2 className="font-semibold">New assignment</h2>
          <ActionForm action={createAssignmentAction} submitLabel="Create assignment" resetOnSuccess className="mt-4">
            <Select id="assignment-course" name="courseId" label="Course" options={courseOptions} required />
            <Input id="assignment-title" name="title" label="Title" required />
            <Textarea id="assignment-instructions" name="instructions" label="Instructions" rows={3} required />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input id="assignment-points" name="points" label="Points" type="number" min={1} defaultValue={100} required />
              <Input id="assignment-due" name="dueAt" label="Due date (optional)" type="date" />
            </div>
          </ActionForm>
        </Card>
      </div>
      {courses.map((course) => (
        <Card key={course.id} className="p-5">
          <h2 className="font-semibold">{course.title}</h2>
          <div className="mt-3 space-y-2">
            {course.quizzes.map((quiz) => (
              <Link key={quiz.id} href={`/admin/assessments/quizzes/${quiz.id}`} className="flex items-center justify-between gap-3 rounded-lg border border-line p-3 text-sm hover:bg-surface-muted">
                <span className="font-medium">{quiz.title}</span>
                <span className="flex items-center gap-2 text-xs text-ink-500">{quiz._count.questions} questions · {quiz._count.attempts} attempts <Badge tone={quiz._count.questions ? "primary" : "warning"}>{quiz._count.questions ? "Quiz" : "Needs questions"}</Badge></span>
              </Link>
            ))}
            {course.assignments.map((assignment) => (
              <div key={assignment.id} className="flex items-center justify-between gap-3 rounded-lg border border-line p-3 text-sm">
                <span className="font-medium">{assignment.title}</span>
                <span className="flex items-center gap-2 text-xs text-ink-500">{assignment.points} points · {assignment._count.submissions} submissions{assignment.dueAt ? ` · Due ${formatDate(assignment.dueAt)}` : ""} <Badge>Assignment</Badge></span>
              </div>
            ))}
            {!course.quizzes.length && !course.assignments.length && <p className="text-sm text-ink-500">Nothing yet.</p>}
          </div>
        </Card>
      ))}
    </div>
  );
}

import { Users } from "lucide-react";
import { addCohortMemberAction, createCohortAction, removeCohortMemberAction } from "@/app/trainer/actions";
import { ActionForm } from "@/components/common/ActionForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, EmptyState, Input, ProgressBar, Select } from "@/components/ui";
import type { getCohortWorkspace } from "@/services/cohorts";

export function TrainerCohorts({ data: { cohorts, courses, students } }: { data: Awaited<ReturnType<typeof getCohortWorkspace>> }) {
  const studentOptions = students.map((student) => ({ value: student.id, label: `${student.name} (${student.email})` }));
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Cohorts" title="Your cohorts" description="Group learners by course. You'll see grading and reports for the learners in your cohorts." />
      <Card className="p-5">
        <h2 className="font-semibold">Create a cohort</h2>
        {courses.length ? (
          <ActionForm action={createCohortAction} submitLabel="Create cohort" resetOnSuccess className="mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Input id="cohort-name" name="name" label="Cohort name" placeholder="e.g. January evening batch" required />
              <Select id="cohort-course" name="courseId" label="Course" options={courses.map((course) => ({ value: course.id, label: course.title }))} required />
            </div>
          </ActionForm>
        ) : (
          <p className="mt-2 text-sm text-ink-500">A course needs to be published before you can create a cohort.</p>
        )}
      </Card>
      {!cohorts.length && <EmptyState icon={Users} title="No cohorts yet" description="Create your first cohort above." />}
      {cohorts.map((cohort) => (
        <Card key={cohort.id} className="p-5">
          <h2 className="font-semibold">{cohort.name}</h2>
          <p className="mt-1 text-sm text-ink-500">{cohort.courseTitle} · {cohort.members.length} learners</p>
          <div className="mt-4 space-y-3">
            {cohort.members.map((member) => (
              <div key={member.id} className="flex flex-col gap-3 rounded-lg border border-line p-3 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{member.name}</div>
                  <div className="mb-2 text-xs text-ink-500">{member.email} · {member.percent}%</div>
                  <ProgressBar value={member.percent} />
                </div>
                <ActionForm action={removeCohortMemberAction} submitLabel="Remove" variant="ghost" size="sm" hidden={{ cohortId: cohort.id, studentId: member.id }} confirmMessage={`Remove ${member.name} from ${cohort.name}? Their enrolment and progress stay.`} />
              </div>
            ))}
          </div>
          {studentOptions.length > 0 && (
            <ActionForm action={addCohortMemberAction} submitLabel="Add learner" variant="outline" hidden={{ cohortId: cohort.id }} className="mt-5 border-t border-line pt-5">
              <Select id={`student-${cohort.id}`} name="studentId" label="Learner" options={studentOptions} required />
            </ActionForm>
          )}
        </Card>
      ))}
    </div>
  );
}

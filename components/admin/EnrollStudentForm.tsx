"use client";

import { useActionState } from "react";
import { enrollStudentAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";
import { Card, Select } from "@/components/ui";

type Option = { value: string; label: string };

export function EnrollStudentForm({ students, courses }: { students: Option[]; courses: Option[] }) {
  const [state, formAction, pending] = useActionState(enrollStudentAction, null);

  return (
    <Card className="p-5">
      <h2 className="font-semibold">Enrol a student</h2>
      {students.length && courses.length ? (
        <form action={formAction} className="mt-4 grid items-end gap-4 md:grid-cols-[1fr_1fr_auto]">
          <Select id="studentId" name="studentId" label="Student" options={students} required />
          <Select id="courseId" name="courseId" label="Published course" options={courses} required />
          <Button type="submit" disabled={pending}>{pending ? "Enrolling..." : "Enrol"}</Button>
        </form>
      ) : (
        <p className="mt-2 text-sm text-ink-500">You need at least one student and one published course.</p>
      )}
      {state && state.message && <p role="status" className={`mt-3 text-sm ${state.ok ? "text-success" : "text-danger"}`}>{state.message}</p>}
    </Card>
  );
}

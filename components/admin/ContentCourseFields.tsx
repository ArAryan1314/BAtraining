import { Input, Select, Textarea } from "@/components/ui";

const levels = [
  { value: "BEGINNER", label: "Beginner" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "ADVANCED", label: "Advanced" },
];

export function ContentCourseFields({ course }: { course?: { title: string; description: string; level: string; durationMinutes: number } }) {
  return (
    <>
      <Input id="course-title" name="title" label="Title" defaultValue={course?.title} required />
      <Textarea id="course-description" name="description" label="Description" defaultValue={course?.description} rows={3} required />
      <div className="grid gap-4 sm:grid-cols-2">
        <Select id="course-level" name="level" label="Level" defaultValue={course?.level} options={levels} required />
        <Input id="course-hours" name="durationHours" label="Duration (hours)" type="number" min={1} step="any" defaultValue={course ? course.durationMinutes / 60 : undefined} required />
      </div>
    </>
  );
}

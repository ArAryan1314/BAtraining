export type CourseLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  level: CourseLevel;
  durationHours: number;
  moduleCount: number;
  completionPercent: number;
  learnerCount: number;
}

export interface ProgressInputs {
  lessonsCompleted: number;
  lessonsTotal: number;
  assignmentsCompleted: number;
  assignmentsTotal: number;
  milestonesCompleted: number;
  milestonesTotal: number;
  /** 0-100, or null when the course has no quizzes. */
  quizAverage: number | null;
}

/** Weighted percentage. Parts a course doesn't have are left out, so finishing everything it does have reaches 100. */
export function calculateProgress(input: ProgressInputs) {
  const parts = [
    { weight: 0.4, total: input.lessonsTotal, ratio: input.lessonsCompleted / input.lessonsTotal },
    { weight: 0.2, total: input.assignmentsTotal, ratio: input.assignmentsCompleted / input.assignmentsTotal },
    { weight: 0.2, total: input.milestonesTotal, ratio: input.milestonesCompleted / input.milestonesTotal },
    { weight: 0.2, total: input.quizAverage === null ? 0 : 1, ratio: Math.max(0, Math.min(1, (input.quizAverage ?? 0) / 100)) },
  ].filter((part) => part.total > 0);

  const totalWeight = parts.reduce((sum, part) => sum + part.weight, 0);
  if (totalWeight === 0) return 0;
  return Math.round((parts.reduce((sum, part) => sum + part.weight * part.ratio, 0) / totalWeight) * 100);
}

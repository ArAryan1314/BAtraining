export type ProgressStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | "BLOCKED";
export type ProgressEventType = "LESSON_COMPLETED" | "QUIZ_ATTEMPTED" | "ASSIGNMENT_SUBMITTED" | "PROJECT_MILESTONE" | "FEEDBACK_RECEIVED" | "LIVE_SESSION_ATTENDED";

export interface ProgressEvent {
  id: string;
  personId: string;
  type: ProgressEventType;
  sourceId: string;
  occurredAt: string;
  score?: number;
  metadata?: Record<string, string | number | boolean>;
}

export interface ProgressNode {
  id: string;
  title: string;
  percent: number;
  status: ProgressStatus;
  completedUnits: number;
  totalUnits: number;
  lastActivityAt?: string;
}

export interface PersonProgress {
  personId: string;
  overallPercent: number;
  activeStreakDays: number;
  completedCourses: number;
  activeCourses: number;
  currentFocusId?: string;
  nodes: ProgressNode[];
}

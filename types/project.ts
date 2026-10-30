export type ProjectStatus = "NOT_STARTED" | "IN_PROGRESS" | "REVIEW" | "READY" | "COMPLETED";
export type SubmissionStatus = "DRAFT" | "SUBMITTED" | "UNDER_REVIEW" | "ACCEPTED" | "CHANGES_REQUESTED";

export interface ProjectSummary {
  id: string;
  title: string;
  status: ProjectStatus;
  milestonePercent: number;
}

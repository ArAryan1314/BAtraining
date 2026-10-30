export type ContentBlockType = "TEXT" | "VIDEO" | "DOCUMENT" | "IMAGE" | "CALLOUT" | "QUIZ" | "ASSIGNMENT";

export interface ContentBlockDefinition {
  id: string;
  type: ContentBlockType;
  title: string;
  payload: Record<string, unknown>;
  sortOrder: number;
}

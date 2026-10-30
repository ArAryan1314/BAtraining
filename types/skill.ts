export type SkillLevel = "AWARENESS" | "DEVELOPING" | "PRACTICED" | "PROFICIENT" | "ADVANCED";

export interface SkillSummary {
  id: string;
  name: string;
  level: SkillLevel;
  score: number;
}

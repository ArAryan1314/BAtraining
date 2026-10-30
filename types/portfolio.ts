export type PortfolioVisibility = "PRIVATE" | "SHARED" | "PUBLIC";

export interface PortfolioItemInput {
  title: string;
  description?: string;
  url?: string;
  sortOrder?: number;
}

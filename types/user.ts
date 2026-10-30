export type UserRole = "ADMIN" | "TRAINER" | "STUDENT";

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  title: string;
  avatarUrl?: string;
}

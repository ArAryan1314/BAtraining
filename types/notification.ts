export type NotificationChannel = "IN_APP" | "EMAIL";
export interface NotificationSummary { id: string; title: string; body: string; channel: NotificationChannel; readAt: Date | null; createdAt: Date; }

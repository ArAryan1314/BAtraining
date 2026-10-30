export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";
export interface PaymentSummary { id: string; amount: string; currency: string; status: PaymentStatus; createdAt: Date; }

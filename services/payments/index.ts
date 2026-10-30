import { prisma } from "@/lib/db/prisma";
import { requirePermission, requireSelfOrPermission, type SessionUser } from "@/lib/auth/guards";
import { writeAuditLog } from "@/services/security";

export async function listStudentPayments(actor: SessionUser, studentId: string) {
  requireSelfOrPermission(actor, studentId, "payments.manage");
  return prisma.payment.findMany({ where: { studentId }, orderBy: { createdAt: "desc" } });
}

export async function recordPayment(actor: SessionUser, input: { studentId: string; provider: string; providerRef?: string; amount: string; currency?: string }) {
  requirePermission(actor, "payments.manage");
  const payment = await prisma.payment.create({ data: { ...input, currency: input.currency ?? "INR" } });
  await writeAuditLog({ actorId: actor.id, action: "payment.record", entityType: "Payment", entityId: payment.id, metadata: { studentId: input.studentId } });
  return payment;
}

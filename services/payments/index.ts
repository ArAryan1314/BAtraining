import { prisma } from "@/lib/db/prisma";
import { requirePermission, requireSelfOrPermission, type SessionUser } from "@/lib/auth/guards";
import { paymentInputSchema } from "@/lib/validations/domain";
import { writeAuditLog } from "@/services/security";

const PAYMENT_LIST_LIMIT = 20;

export async function listStudentPayments(actor: SessionUser, studentId: string) {
  requireSelfOrPermission(actor, studentId, "payments.manage");
  return prisma.payment.findMany({ where: { studentId }, orderBy: { createdAt: "desc" } });
}

export async function listRecentPayments(actor: SessionUser) {
  requirePermission(actor, "payments.read");
  return prisma.payment.findMany({ include: { student: { select: { name: true } } }, orderBy: { createdAt: "desc" }, take: PAYMENT_LIST_LIMIT });
}

/** Records a payment taken outside the platform. There is no payment gateway yet. */
export async function recordManualPayment(actor: SessionUser, input: unknown) {
  requirePermission(actor, "payments.manage");
  const data = paymentInputSchema.parse(input);
  const payment = await prisma.payment.create({ data: { ...data, provider: "manual", status: "PAID" } });
  await writeAuditLog({ actorId: actor.id, action: "payment.record", entityType: "Payment", entityId: payment.id, metadata: { studentId: data.studentId } });
  return "Payment recorded.";
}

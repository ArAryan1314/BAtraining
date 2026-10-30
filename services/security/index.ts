import { prisma } from "@/lib/db/prisma";

export async function writeAuditLog(input: { actorId: string; action: string; entityType: string; entityId?: string; metadata?: object }) {
  return prisma.auditLog.create({ data: { ...input, metadata: input.metadata ?? undefined } });
}

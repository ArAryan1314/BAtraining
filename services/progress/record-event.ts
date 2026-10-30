import { prisma } from "@/lib/db/prisma";
import type { Prisma, ProgressEventType } from "@/generated/prisma/client";

export async function recordProgressEvent(
  input: { studentId: string; type: ProgressEventType; entityId: string; metadata?: Prisma.InputJsonObject },
  db: Prisma.TransactionClient = prisma,
) {
  return db.progressEvent.create({ data: input });
}

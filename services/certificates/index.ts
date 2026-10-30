import { prisma } from "@/lib/db/prisma";
import { requireSelfOrPermission, type SessionUser } from "@/lib/auth/guards";

export async function listStudentCertificates(actor: SessionUser, studentId: string) {
  requireSelfOrPermission(actor, studentId, "students.read");
  return prisma.certificate.findMany({ where: { studentId }, orderBy: { issuedAt: "desc" } });
}

/** Public by design: anyone holding a code can check it. */
export async function verifyCertificate(verificationCode: string) {
  return prisma.certificate.findUnique({ where: { verificationCode }, select: { title: true, status: true } });
}

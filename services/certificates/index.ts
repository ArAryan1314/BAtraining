import { randomBytes } from "node:crypto";
import { prisma } from "@/lib/db/prisma";
import { requirePermission, requireSelfOrPermission, type SessionUser } from "@/lib/auth/guards";
import { z } from "zod";
import { notify } from "@/services/notifications";
import { writeAuditLog } from "@/services/security";

const CERTIFICATE_LIST_LIMIT = 50;

export async function listStudentCertificates(actor: SessionUser, studentId: string) {
  requireSelfOrPermission(actor, studentId, "students.read");
  return prisma.certificate.findMany({ where: { studentId, status: { not: "DRAFT" } }, orderBy: { issuedAt: "desc" } });
}

/** Public by design: anyone holding a code can check it. */
export async function verifyCertificate(verificationCode: string) {
  return prisma.certificate.findUnique({ where: { verificationCode }, select: { title: true, status: true } });
}

/** Internal: issued when a student finishes a course. A revoked certificate is never reissued automatically. */
export async function issueCourseCertificate(studentId: string, courseTitle: string) {
  const existing = await prisma.certificate.findFirst({ where: { studentId, title: courseTitle } });
  if (existing) return existing;
  const certificate = await prisma.certificate.create({
    data: { studentId, title: courseTitle, verificationCode: randomBytes(8).toString("hex").toUpperCase(), status: "ISSUED", issuedAt: new Date() },
  });
  await notify(studentId, "Certificate issued", `Congratulations! You've earned your certificate for ${courseTitle}.`);
  return certificate;
}

export async function listCertificatesForAdmin(actor: SessionUser) {
  requirePermission(actor, "certificates.revoke");
  return prisma.certificate.findMany({ include: { student: { select: { name: true } } }, orderBy: { issuedAt: "desc" }, take: CERTIFICATE_LIST_LIMIT });
}

export async function revokeCertificate(actor: SessionUser, input: unknown) {
  requirePermission(actor, "certificates.revoke");
  const { certificateId } = z.object({ certificateId: z.string().min(1) }).parse(input);
  const certificate = await prisma.certificate.update({ where: { id: certificateId }, data: { status: "REVOKED", revokedAt: new Date() } });
  await writeAuditLog({ actorId: actor.id, action: "certificate.revoke", entityType: "Certificate", entityId: certificateId });
  await notify(certificate.studentId, "Certificate revoked", `Your certificate for ${certificate.title} has been revoked. Contact your advisor if you have questions.`);
}

import { prisma } from "@/lib/db/prisma";
import { DomainError } from "@/lib/actions/result";
import { requirePermission, type SessionUser } from "@/lib/auth/guards";
import { enquiryInputSchema, enquiryStatusSchema } from "@/lib/validations/domain";
import { writeAuditLog } from "@/services/security";

const ENQUIRY_LIST_LIMIT = 200;

/**
 * Saves an enquiry from the public contact form. There is no signed-in user, so it is not permission-checked;
 * the caller is responsible for abuse protection (see `app/(public)/contact/actions.ts`).
 */
export async function submitEnquiry(input: unknown) {
  const data = enquiryInputSchema.parse(input);
  const enquiry = await prisma.enquiry.create({ data });
  return enquiry.id;
}

/** Newest first, with unanswered enquiries before handled ones. */
export async function listEnquiries(actor: SessionUser) {
  requirePermission(actor, "enquiries.read");
  const enquiries = await prisma.enquiry.findMany({ orderBy: { createdAt: "desc" }, take: ENQUIRY_LIST_LIMIT });
  const order = { NEW: 0, CONTACTED: 1, CLOSED: 2 } as const;
  return [...enquiries].sort((a, b) => order[a.status] - order[b.status]);
}

export async function countNewEnquiries(actor: SessionUser) {
  requirePermission(actor, "enquiries.read");
  return prisma.enquiry.count({ where: { status: "NEW" } });
}

export async function setEnquiryStatus(actor: SessionUser, input: unknown) {
  requirePermission(actor, "enquiries.write");
  const { enquiryId, status } = enquiryStatusSchema.parse(input);
  const existing = await prisma.enquiry.findUnique({ where: { id: enquiryId }, select: { id: true } });
  if (!existing) throw new DomainError("This enquiry no longer exists.");
  await prisma.enquiry.update({ where: { id: enquiryId }, data: { status } });
  await writeAuditLog({ actorId: actor.id, action: "enquiry.status", entityType: "Enquiry", entityId: enquiryId, metadata: { status } });
}

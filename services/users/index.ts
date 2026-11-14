import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/prisma";
import { DomainError } from "@/lib/actions/result";
import { requirePermission, requireSelfOrPermission, type SessionUser } from "@/lib/auth/guards";
import { passwordChangeSchema, userInputSchema } from "@/lib/validations/domain";
import { writeAuditLog } from "@/services/security";
import type { UserRole } from "@/types/user";

const USER_LIST_LIMIT = 200;
const BCRYPT_ROUNDS = 12;

export async function getUserById(actor: SessionUser, id: string) {
  requireSelfOrPermission(actor, id, "users.read");
  return prisma.user.findUnique({ where: { id }, omit: { passwordHash: true } });
}

export async function listUsers(actor: SessionUser, role?: UserRole) {
  requirePermission(actor, "users.read");
  return prisma.user.findMany({ where: { role }, omit: { passwordHash: true }, orderBy: { name: "asc" }, take: USER_LIST_LIMIT });
}

export async function createUser(actor: SessionUser, input: unknown) {
  requirePermission(actor, "users.write");
  const { password, ...fields } = userInputSchema.parse(input);
  if (await prisma.user.findUnique({ where: { email: fields.email }, select: { id: true } })) throw new DomainError("Someone already has an account with that email.");

  const user = await prisma.user.create({
    data: {
      ...fields,
      passwordHash: await bcrypt.hash(password, BCRYPT_ROUNDS),
      ...(fields.role === "STUDENT" ? { studentProfile: { create: {} } } : {}),
      ...(fields.role === "TRAINER" ? { trainerProfile: { create: {} } } : {}),
    },
  });
  await writeAuditLog({ actorId: actor.id, action: "user.create", entityType: "User", entityId: user.id, metadata: { role: fields.role } });
  return `Account created for ${user.name}. Share the temporary password securely and ask them to change it.`;
}

export async function changeMyPassword(actor: SessionUser, input: unknown) {
  const { currentPassword, newPassword } = passwordChangeSchema.parse(input);
  const user = await prisma.user.findUnique({ where: { id: actor.id } });
  if (!user?.passwordHash || !(await bcrypt.compare(currentPassword, user.passwordHash))) throw new DomainError("Your current password isn't correct.");
  await prisma.user.update({ where: { id: actor.id }, data: { passwordHash: await bcrypt.hash(newPassword, BCRYPT_ROUNDS) } });
  await writeAuditLog({ actorId: actor.id, action: "user.changePassword", entityType: "User", entityId: actor.id });
  return "Your password has been changed.";
}

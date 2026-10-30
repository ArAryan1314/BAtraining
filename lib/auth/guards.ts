import type { UserRole } from "@/types/user";
import type { Permission } from "@/config/permissions";
import { can } from "@/lib/permissions";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export function requireUser(user: SessionUser | null): SessionUser {
  if (!user) throw new Error("UNAUTHENTICATED");
  return user;
}

export function requireRole(user: SessionUser | null, roles: readonly UserRole[]): SessionUser {
  const sessionUser = requireUser(user);
  if (!roles.includes(sessionUser.role)) throw new Error("FORBIDDEN");
  return sessionUser;
}

export function requirePermission(user: SessionUser | null, permission: Permission): SessionUser {
  const sessionUser = requireUser(user);
  if (!can(sessionUser.role, permission)) throw new Error("FORBIDDEN");
  return sessionUser;
}

/** For a student's own records: allows the student themselves, or anyone holding `permission`. */
export function requireSelfOrPermission(user: SessionUser | null, studentId: string, permission: Permission): SessionUser {
  const sessionUser = requireUser(user);
  if (sessionUser.id !== studentId && !can(sessionUser.role, permission)) throw new Error("FORBIDDEN");
  return sessionUser;
}

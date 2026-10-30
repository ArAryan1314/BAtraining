import type { UserRole } from "@/types/user";
import { permissions, type Permission } from "@/config/permissions";

export function can(role: UserRole, permission: Permission): boolean {
  return (permissions[role] as readonly string[]).includes(permission);
}

export function canAll(role: UserRole, required: readonly Permission[]): boolean {
  return required.every((permission) => can(role, permission));
}

export function canAny(role: UserRole, required: readonly Permission[]): boolean {
  return required.some((permission) => can(role, permission));
}

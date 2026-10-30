import { requireWorkspaceUser } from "@/services/auth";
import type { UserRole } from "@/types/user";
import { AppShell } from "./AppShell";

/** Guards a role's routes and wraps them in that role's shell. */
export async function WorkspaceLayout({ role, children }: { role: UserRole; children: React.ReactNode }) {
  const user = await requireWorkspaceUser(role);
  return <AppShell role={role} userName={user.name}>{children}</AppShell>;
}

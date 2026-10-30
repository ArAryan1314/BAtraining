import { cache } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import type { SessionUser } from "@/lib/auth/guards";
import { authOptions } from "@/lib/auth/options";
import { workspaces } from "@/config/navigation";
import type { UserRole } from "@/types/user";

export const getSessionUser = cache(async (): Promise<SessionUser | null> => {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  const { id, name, email, role } = session.user;
  return { id, role, name: name ?? "", email: email ?? "" };
});

/** Page-level guard: sends visitors to sign in, and signed-in users of another role to their own workspace. */
export async function requireWorkspaceUser(role: UserRole): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) redirect("/auth/login");
  if (user.role !== role) redirect(workspaces[user.role].home);
  return user;
}

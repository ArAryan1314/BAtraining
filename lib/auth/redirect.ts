import { workspaces } from "@/config/navigation";
import type { UserRole } from "@/types/user";

const workspacePrefix = (role: UserRole) => workspaces[role].home.split("/")[1];

/**
 * Where to send a user after signing in. Honours the page they were trying to reach, but only when it is a
 * path inside their own workspace, so a crafted link can't bounce them to another site or another role's area.
 */
export function postSignInPath(role: UserRole, callbackUrl: string | null | undefined): string {
  const fallback = workspaces[role].home;
  if (!callbackUrl || !callbackUrl.startsWith("/") || callbackUrl.startsWith("//") || callbackUrl.includes("\\")) return fallback;
  const [firstSegment] = callbackUrl.slice(1).split(/[/?#]/);
  return firstSegment === workspacePrefix(role) ? callbackUrl : fallback;
}

import type { Metadata } from "next";
import { privateMetadata } from "@/lib/seo";
import { redirect } from "next/navigation";
import { LoginScreen } from "@/components/common/LoginScreen";
import { workspaces } from "@/config/navigation";
import { getSessionUser } from "@/services/auth";

export const metadata: Metadata = { title: "Sign in", ...privateMetadata };

export default async function LoginPage() {
  const user = await getSessionUser();
  if (user) redirect(workspaces[user.role].home);
  return <LoginScreen />;
}

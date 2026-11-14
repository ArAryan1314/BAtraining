import type { Metadata } from "next";
import { privateMetadata } from "@/lib/seo";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LoginScreen } from "@/components/common/LoginScreen";
import { signInUnavailable } from "@/lib/auth/availability";
import { workspaces } from "@/config/navigation";
import { getSessionUser } from "@/services/auth";

export const metadata: Metadata = { title: "Sign in", ...privateMetadata };

export default async function LoginPage() {
  const user = await getSessionUser();
  if (user) redirect(workspaces[user.role].home);
  return <Suspense><LoginScreen unavailable={signInUnavailable(process.env)} /></Suspense>;
}

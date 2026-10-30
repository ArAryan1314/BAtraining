import { redirect } from "next/navigation";
import { LoginScreen } from "@/components/common/LoginScreen";
import { workspaces } from "@/config/navigation";
import { getSessionUser } from "@/services/auth";

export default async function LoginPage() {
  const user = await getSessionUser();
  if (user) redirect(workspaces[user.role].home);
  return <LoginScreen />;
}

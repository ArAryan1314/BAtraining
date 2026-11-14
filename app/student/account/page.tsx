import { AccountPage } from "@/components/common/AccountPage";
import { requireWorkspaceUser } from "@/services/auth";

export default async function AccountRoutePage() {
  const user = await requireWorkspaceUser("STUDENT");
  return <AccountPage user={user} />;
}

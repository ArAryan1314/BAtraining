import { AccountPage } from "@/components/common/AccountPage";
import { requireWorkspaceUser } from "@/services/auth";

export default async function AccountRoutePage() {
  const user = await requireWorkspaceUser("TRAINER");
  return <AccountPage user={user} />;
}

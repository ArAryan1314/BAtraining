import { AdminSettings } from "@/components/admin/AdminSettings";
import { requireWorkspaceUser } from "@/services/auth";
import { getIntegrationStatus } from "@/services/reports";

export default async function AdminSettingsPage() {
  const user = await requireWorkspaceUser("ADMIN");
  return <AdminSettings user={user} integrations={getIntegrationStatus(user)} />;
}

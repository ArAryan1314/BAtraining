import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { requireWorkspaceUser } from "@/services/auth";
import { getAdminDashboard } from "@/services/dashboards";

export default async function AdminDashboardPage() {
  const user = await requireWorkspaceUser("ADMIN");
  return <AdminDashboard data={await getAdminDashboard(user)} />;
}

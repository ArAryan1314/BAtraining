import { AdminUsers } from "@/components/admin/AdminUsers";
import { requireWorkspaceUser } from "@/services/auth";
import { listUsers } from "@/services/users";

export default async function AdminUsersPage() {
  const user = await requireWorkspaceUser("ADMIN");
  return <AdminUsers users={await listUsers(user)} />;
}

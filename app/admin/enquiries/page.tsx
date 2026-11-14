import { AdminEnquiries } from "@/components/admin/AdminEnquiries";
import { requireWorkspaceUser } from "@/services/auth";
import { listEnquiries } from "@/services/enquiries";

export default async function AdminEnquiriesPage() {
  const user = await requireWorkspaceUser("ADMIN");
  return <AdminEnquiries enquiries={await listEnquiries(user)} />;
}

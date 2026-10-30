import { AdminContent } from "@/components/admin/AdminContent";
import { requireWorkspaceUser } from "@/services/auth";
import { listCoursesForAdmin } from "@/services/cms";

export default async function AdminContentPage() {
  const user = await requireWorkspaceUser("ADMIN");
  return <AdminContent courses={await listCoursesForAdmin(user)} />;
}

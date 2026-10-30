import { StudentNotifications } from "@/components/student/StudentNotifications";
import { requireWorkspaceUser } from "@/services/auth";
import { listMyNotifications } from "@/services/notifications";

export default async function StudentNotificationsPage() {
  const user = await requireWorkspaceUser("STUDENT");
  return <StudentNotifications notifications={await listMyNotifications(user)} />;
}

import { AdminReports } from "@/components/admin/AdminReports";
import { requireWorkspaceUser } from "@/services/auth";
import { listCertificatesForAdmin } from "@/services/certificates";
import { listRecentPayments } from "@/services/payments";
import { getPlatformReport } from "@/services/reports";
import { listUsers } from "@/services/users";

export default async function AdminReportsPage() {
  const user = await requireWorkspaceUser("ADMIN");
  const [report, payments, certificates, students] = await Promise.all([getPlatformReport(user), listRecentPayments(user), listCertificatesForAdmin(user), listUsers(user, "STUDENT")]);
  return <AdminReports report={report} payments={payments} certificates={certificates} students={students} />;
}

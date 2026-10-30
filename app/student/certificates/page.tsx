import { StudentCertificates } from "@/components/student/StudentCertificates";
import { requireWorkspaceUser } from "@/services/auth";
import { listStudentCertificates } from "@/services/certificates";

export default async function StudentCertificatesPage() {
  const user = await requireWorkspaceUser("STUDENT");
  return <StudentCertificates certificates={await listStudentCertificates(user, user.id)} />;
}

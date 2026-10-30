import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge, EmptyState, Table } from "@/components/ui";
import { formatDate } from "@/lib/format";
import type { listStudentCertificates } from "@/services/certificates";

export function StudentCertificates({ certificates }: { certificates: Awaited<ReturnType<typeof listStudentCertificates>> }) {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Certificates" title="Your certificates" description="You earn a certificate automatically when you finish a course." />
      {certificates.length ? (
        <Table
          headers={["Course", "Issued", "Status", "Verification"]}
          rows={certificates.map((certificate) => [
            <span key="title" className="font-medium text-ink-900">{certificate.title}</span>,
            formatDate(certificate.issuedAt),
            <Badge key="status" tone={certificate.status === "ISSUED" ? "success" : "danger"}>{certificate.status === "ISSUED" ? "Valid" : "Revoked"}</Badge>,
            <Link key="verify" href={`/verify/${certificate.verificationCode}`} className="font-medium text-primary-700 hover:underline">{certificate.verificationCode}</Link>,
          ])}
        />
      ) : (
        <EmptyState icon={GraduationCap} title="No certificates yet" description="Finish all the lessons, quizzes and assignments in a course to earn one." />
      )}
    </div>
  );
}

import { recordPaymentAction, revokeCertificateAction } from "@/app/admin/actions";
import { ActionForm } from "@/components/common/ActionForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge, Card, Input, Select, Table } from "@/components/ui";
import { formatDate } from "@/lib/format";
import type { listCertificatesForAdmin } from "@/services/certificates";
import type { listRecentPayments } from "@/services/payments";
import type { getPlatformReport } from "@/services/reports";

interface AdminReportsProps {
  report: Awaited<ReturnType<typeof getPlatformReport>>;
  payments: Awaited<ReturnType<typeof listRecentPayments>>;
  certificates: Awaited<ReturnType<typeof listCertificatesForAdmin>>;
  students: { id: string; name: string; email: string }[];
}

export function AdminReports({ report, payments, certificates, students }: AdminReportsProps) {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Reports" title="Platform reports" description="Course performance, payments, certificates and the audit log." />
      <section className="space-y-3">
        <h2 className="font-semibold">Courses</h2>
        <Table
          headers={["Course", "Status", "Enrolled", "Completed", "Average progress"]}
          rows={report.courses.map((course) => [
            <span key="title" className="font-medium text-ink-900">{course.title}</span>,
            <Badge key="status" tone={course.published ? "success" : "neutral"}>{course.published ? "Published" : "Draft"}</Badge>,
            course.enrolled,
            course.completed,
            `${course.percent}%`,
          ])}
        />
      </section>
      <section className="space-y-3">
        <h2 className="font-semibold">Payments</h2>
        <p className="text-sm text-ink-500">Total received: {report.revenue.length ? report.revenue.map((row) => `${row.currency} ${row.total}`).join(", ") : "nothing yet"}. No payment gateway is connected, so record payments taken elsewhere here.</p>
        {students.length > 0 && (
          <Card className="p-5">
            <ActionForm action={recordPaymentAction} submitLabel="Record payment" resetOnSuccess>
              <div className="grid gap-4 md:grid-cols-3">
                <Select id="payment-student" name="studentId" label="Student" options={students.map((student) => ({ value: student.id, label: `${student.name} (${student.email})` }))} required />
                <Input id="payment-amount" name="amount" label="Amount (INR)" inputMode="decimal" placeholder="4999.00" required />
                <Input id="payment-ref" name="providerRef" label="Reference (optional)" />
              </div>
            </ActionForm>
          </Card>
        )}
        {payments.length > 0 && (
          <Table
            headers={["Student", "Amount", "Reference", "Date"]}
            rows={payments.map((payment) => [payment.student.name, `${payment.currency} ${payment.amount.toString()}`, payment.providerRef ?? "—", formatDate(payment.createdAt)])}
          />
        )}
      </section>
      <section className="space-y-3">
        <h2 className="font-semibold">Certificates</h2>
        {certificates.length ? (
          <Table
            headers={["Student", "Course", "Issued", "Status", ""]}
            rows={certificates.map((certificate) => [
              certificate.student.name,
              certificate.title,
              formatDate(certificate.issuedAt),
              <Badge key="status" tone={certificate.status === "ISSUED" ? "success" : "danger"}>{certificate.status === "ISSUED" ? "Valid" : "Revoked"}</Badge>,
              certificate.status === "ISSUED" ? <ActionForm key="revoke" action={revokeCertificateAction} submitLabel="Revoke" variant="ghost" size="sm" hidden={{ certificateId: certificate.id }} confirmMessage={`Revoke ${certificate.student.name}'s certificate?`} /> : null,
            ])}
          />
        ) : (
          <p className="text-sm text-ink-500">No certificates issued yet.</p>
        )}
      </section>
      <section className="space-y-3">
        <h2 className="font-semibold">Audit log</h2>
        {report.auditLogs.length ? (
          <Table
            headers={["When", "Who", "Action", "Record"]}
            rows={report.auditLogs.map((log) => [formatDate(log.createdAt), log.actor.name, log.action, log.entityType])}
          />
        ) : (
          <p className="text-sm text-ink-500">Nothing recorded yet.</p>
        )}
      </section>
    </div>
  );
}

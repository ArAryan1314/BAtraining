import { setEnquiryStatusAction } from "@/app/admin/actions";
import { ActionForm } from "@/components/common/ActionForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge, EmptyState, Select, Table } from "@/components/ui";
import { enquiryStatuses } from "@/config/enquiry";
import { formatDate } from "@/lib/format";
import type { listEnquiries } from "@/services/enquiries";
import { Inbox } from "lucide-react";

type Enquiry = Awaited<ReturnType<typeof listEnquiries>>[number];

const statusLabel: Record<Enquiry["status"], string> = { NEW: "New", CONTACTED: "Contacted", CLOSED: "Closed" };
const statusTone: Record<Enquiry["status"], "warning" | "primary" | "neutral"> = { NEW: "warning", CONTACTED: "primary", CLOSED: "neutral" };
const statusOptions = enquiryStatuses.map((status) => ({ value: status, label: statusLabel[status] }));

/** Enquiries from the public contact form, unanswered ones first. */
export function AdminEnquiries({ enquiries }: { enquiries: Enquiry[] }) {
  const unanswered = enquiries.filter((enquiry) => enquiry.status === "NEW").length;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Admissions"
        title="Enquiries"
        description={unanswered ? `${unanswered} waiting for a reply. Reply by email, then mark it contacted.` : "Messages from the contact form appear here."}
      />
      {enquiries.length ? (
        <Table
          headers={["From", "Interested in", "Message", "Received", "Status"]}
          rows={enquiries.map((enquiry) => [
            <div key="from">
              <p className="font-medium text-ink-900">{enquiry.name}</p>
              <a href={`mailto:${enquiry.email}`} className="ui-link text-sm">{enquiry.email}</a>
              {enquiry.role && <p className="text-xs text-ink-500">{enquiry.role}</p>}
            </div>,
            enquiry.interest,
            <p key="message" className="max-w-md whitespace-pre-line text-ink-700">{enquiry.message}</p>,
            formatDate(enquiry.createdAt),
            <div key="status" className="space-y-2">
              <Badge tone={statusTone[enquiry.status]}>{statusLabel[enquiry.status]}</Badge>
              <ActionForm action={setEnquiryStatusAction} submitLabel="Save" size="sm" variant="outline" hidden={{ enquiryId: enquiry.id }} className="flex items-end gap-2 space-y-0">
                <Select name="status" aria-label={`Status for ${enquiry.name}`} defaultValue={enquiry.status} options={statusOptions} className="h-9" />
              </ActionForm>
            </div>,
          ])}
        />
      ) : (
        <EmptyState icon={Inbox} title="No enquiries yet" description="When someone sends the contact form, it will appear here." />
      )}
    </div>
  );
}

import { CheckCircle2, Clock, FileText, FolderKanban, MessageSquareText } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/format";

export interface QueueItem {
  id: string;
  kind: "Assignment" | "Project";
  title: string;
  detail: string;
  student: string;
  submittedAt: Date;
  waitingDays: number;
  overdue: boolean;
}

const waiting = (days: number) => (days === 0 ? "Today" : days === 1 ? "1 day" : `${days} days`);

/** Submissions waiting for a grade, oldest first, with how long each has been waiting. Overdue ones are marked. */
export function ReviewQueue({ items }: { items: QueueItem[] }) {
  if (items.length === 0) {
    return (
      <div className="flex items-center gap-3 rounded-md bg-emerald-50 p-4 text-sm text-emerald-800">
        <CheckCircle2 size={18} aria-hidden /> Nothing is waiting for review.
      </div>
    );
  }
  return (
    <ul className="divide-y divide-line">
      {items.map((item) => {
        const Icon = item.kind === "Assignment" ? FileText : FolderKanban;
        return (
          <li key={`${item.kind}-${item.id}`} className="flex items-center gap-4 py-3.5">
            <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-md", item.overdue ? "bg-rose-50 text-rose-600" : "bg-primary-50 text-primary-600")}><Icon size={16} aria-hidden /></span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-ink-900">{item.title}</div>
              <div className="truncate text-xs text-ink-500">{item.student} · {item.detail} · {formatDate(item.submittedAt)}</div>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <Badge tone={item.overdue ? "danger" : "neutral"}>{item.kind}</Badge>
              <span className={cn("inline-flex items-center gap-1 text-xs", item.overdue ? "font-semibold text-rose-600" : "text-ink-500")}><Clock size={11} aria-hidden />{waiting(item.waitingDays)}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** The feedback a trainer wrote, or a learner received, newest first. */
export function FeedbackList({ items, empty }: { items: { id: string; who: string; notes: string; score: number | null; at: Date }[]; empty: string }) {
  if (items.length === 0) return <p className="text-sm text-ink-500">{empty}</p>;
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.id} className="flex gap-3">
          <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md bg-violet-50 text-violet-600"><MessageSquareText size={15} aria-hidden /></span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 text-sm"><span className="font-semibold">{item.who}</span>{item.score !== null && <Badge tone="primary">{Math.round(item.score)}%</Badge>}<span className="text-xs text-ink-400">{formatDate(item.at)}</span></div>
            <p className="mt-1 line-clamp-2 text-sm leading-6 text-ink-600">{item.notes}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

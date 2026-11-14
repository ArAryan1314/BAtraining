import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Badge, Card } from "@/components/ui";
import { latestRelease } from "@/content/changelog";
import { formatDate } from "@/lib/format";

const HIGHLIGHT_COUNT = 3;

/** The newest release, with the first few changes. Shared by every workspace dashboard. */
export function WhatsNewCard() {
  const { version, date, title, changes } = latestRelease;
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 font-semibold"><Sparkles size={16} className="text-primary-600" /> What&apos;s new</h2>
        <Badge tone="primary">v{version}</Badge>
      </div>
      <p className="mt-3 font-medium text-ink-900">{title}</p>
      <time dateTime={date} className="text-xs text-ink-500">{formatDate(new Date(date))}</time>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-ink-600">
        {changes.slice(0, HIGHLIGHT_COUNT).map((change) => <li key={change.text} className="flex gap-2"><span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary-400" />{change.text}</li>)}
      </ul>
      <Link href="/changelog" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700">Full release notes <ArrowUpRight size={14} /></Link>
    </Card>
  );
}

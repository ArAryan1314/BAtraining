import { Card, ProgressBar } from "@/components/ui";

export function ProgressSummary({ label, percent, completed, total, meta }: { label: string; percent: number; completed: number; total: number; meta?: string }) { return <Card className="p-5"><div className="flex items-end justify-between gap-3"><div><div className="text-sm font-semibold">{label}</div><div className="mt-1 text-xs text-ink-500">{meta ?? `${completed} of ${total} units`}</div></div><div className="text-2xl font-black">{percent}%</div></div><ProgressBar className="mt-4" value={percent} /></Card>; }

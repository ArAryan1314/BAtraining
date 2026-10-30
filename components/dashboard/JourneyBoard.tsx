import { ArrowUpRight, CircleCheck, CircleDashed } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { ProgressNode } from "@/types/progress";

export function JourneyBoard({ nodes }: { nodes: ProgressNode[] }) {
  return <Card className="p-5 sm:p-6"><div className="flex items-center justify-between"><div><div className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-600">Journey board</div><h3 className="mt-1 text-xl font-semibold">Your structured path</h3></div><button className="text-sm font-semibold text-primary-700">View map <ArrowUpRight className="inline" size={16} /></button></div><div className="mt-6 space-y-4">{nodes.map(node => <div key={node.id} className="rounded-xl border border-line p-4"><div className="flex gap-4"><div className="mt-0.5">{node.status === "COMPLETED" ? <CircleCheck className="text-success" size={21} /> : <CircleDashed className="text-ink-400" size={21} />}</div><div className="min-w-0 flex-1"><div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><div><div className="font-semibold">{node.title}</div><div className="mt-1 text-xs text-ink-500">{node.completedUnits} of {node.totalUnits} units · {node.lastActivityAt ?? "Ready to start"}</div></div><div className="text-sm font-semibold">{node.percent}%</div></div><ProgressBar className="mt-3" value={node.percent} /></div></div></div>)}</div></Card>;
}

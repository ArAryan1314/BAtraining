import { Check, Circle } from "lucide-react";
import type { ProgressNode } from "@/types/progress";

export function ProgressRail({ nodes }: { nodes: ProgressNode[] }) {
  return <div className="relative"><div className="absolute left-[13px] top-4 h-[calc(100%-32px)] w-px bg-line" />{nodes.map((node, index) => <div key={node.id} className="relative flex gap-4 pb-7 last:pb-0"><div className="z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white ring-4 ring-surface-muted">{node.status === "COMPLETED" ? <span className="grid h-7 w-7 place-items-center rounded-full bg-success text-white"><Check size={15} /></span> : <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-primary-200 bg-primary-50"><Circle size={10} className="fill-primary-500 text-primary-500" /></span>}</div><div className="flex-1 pt-0.5"><div className="flex justify-between gap-3"><span className="text-sm font-semibold">Step {index + 1}: {node.title}</span><span className="text-xs font-semibold text-ink-500">{node.percent}%</span></div><div className="mt-1 text-xs text-ink-500">{node.completedUnits}/{node.totalUnits} units complete</div></div></div>)}</div>;
}

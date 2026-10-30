import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";

export type StatTone = "blue" | "violet" | "emerald" | "amber";
export function StatCard({ label, value, trend, hint, icon: Icon, tone = "blue" }: { label: string; value: string | number; trend?: string; hint?: string; icon?: React.ComponentType<{ size?: number; className?: string }>; tone?: StatTone }) {
  return <Card className="p-5"><div className="flex items-start justify-between gap-4"><div><div className="text-sm font-medium text-ink-500">{label}</div><div className="mt-3 text-3xl font-black tracking-tight">{value}</div>{hint && <div className="mt-1 text-xs text-ink-500">{hint}</div>}</div>{Icon && <div className={["grid h-10 w-10 place-items-center rounded-lg", tone === "blue" && "bg-primary-50 text-primary-600", tone === "violet" && "bg-violet-50 text-violet-600", tone === "emerald" && "bg-emerald-50 text-emerald-600", tone === "amber" && "bg-amber-50 text-amber-600"].filter(Boolean).join(" ")}><Icon size={18} /></div>}</div>{trend && <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-success"><ArrowUpRight size={13} />{trend}</div>}</Card>;
}

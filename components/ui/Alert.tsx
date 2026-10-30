import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/cn";

const iconMap = { info: Info, success: CheckCircle2, warning: TriangleAlert, danger: AlertCircle } as const;

export function Alert({ tone = "info", title, children }: { tone?: keyof typeof iconMap; title: string; children?: React.ReactNode }) {
  const Icon = iconMap[tone];
  return <div className={cn("rounded-xl border p-4", tone === "info" && "border-sky-200 bg-sky-50", tone === "success" && "border-green-200 bg-green-50", tone === "warning" && "border-amber-200 bg-amber-50", tone === "danger" && "border-red-200 bg-red-50")} role="status"><div className="flex gap-3"><Icon size={19} className="mt-0.5 shrink-0" /><div><div className="text-sm font-semibold">{title}</div>{children && <div className="mt-1 text-sm text-ink-700">{children}</div>}</div></div></div>;
}

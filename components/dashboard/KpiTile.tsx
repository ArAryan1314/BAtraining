import type { LucideIcon } from "lucide-react";
import { Delta, Sparkline, TONE, type ChartTone } from "@/components/charts";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

const ICON_TONE: Record<ChartTone, string> = {
  primary: "bg-primary-50 text-primary-600",
  emerald: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  rose: "bg-rose-50 text-rose-600",
  violet: "bg-violet-50 text-violet-600",
  sky: "bg-sky-50 text-sky-600",
  ink: "bg-ink-100 text-ink-600",
};

/**
 * A headline number with its context: how it moved against the previous period, a sparkline of the recent
 * days, and a hint saying what it counts. Every part but the label and value is optional.
 */
export function KpiTile({ label, value, hint, icon: Icon, tone = "primary", change, showDelta = false, series, seriesLabel }: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: LucideIcon;
  tone?: ChartTone;
  /** Percent change against the previous period; `null` reads "New activity". Only shown when `showDelta` is set. */
  change?: number | null;
  showDelta?: boolean;
  series?: readonly number[];
  seriesLabel?: string;
}) {
  return (
    <Card className="flex flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-medium text-ink-500">{label}</div>
          <div className="mt-2 text-3xl font-semibold tracking-tight tabular-nums">{value}</div>
        </div>
        {Icon && <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-md", ICON_TONE[tone])}><Icon size={18} aria-hidden /></span>}
      </div>
      <div className="mt-3 min-h-5 text-xs text-ink-500">{showDelta && change !== undefined ? <Delta change={change} /> : hint}</div>
      {series && series.length > 1 && <Sparkline values={series} tone={tone} label={seriesLabel ?? `${label}, recent trend`} className={cn("mt-3", TONE[tone].text)} />}
    </Card>
  );
}

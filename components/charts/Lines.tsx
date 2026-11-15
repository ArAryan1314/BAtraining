import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { cn } from "@/lib/cn";
import { TONE, type ChartTone } from "./tones";

/** Builds an SVG path through `values`, scaled into a `width` x `height` box with `pad` space around it. */
function plot(values: readonly number[], width: number, height: number, pad: number, max: number) {
  const step = values.length > 1 ? (width - pad * 2) / (values.length - 1) : 0;
  return values.map((value, index) => ({ x: pad + index * step, y: height - pad - (max === 0 ? 0 : (value / max) * (height - pad * 2)) }));
}
const line = (points: { x: number; y: number }[]) => points.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");

/** A tiny trend line with no axes, for inside a stat tile. */
export function Sparkline({ values, tone = "primary", className, label }: { values: readonly number[]; tone?: ChartTone; className?: string; label: string }) {
  const max = Math.max(...values, 1);
  const points = plot(values, 120, 36, 3, max);
  const last = points.at(-1);
  return (
    <svg role="img" aria-label={label} viewBox="0 0 120 36" preserveAspectRatio="none" className={cn("h-9 w-full overflow-visible", className)}>
      <path d={`${line(points)} L${points.at(-1)?.x ?? 0} 36 L${points[0]?.x ?? 0} 36 Z`} className={TONE[tone].soft} />
      <path d={line(points)} fill="none" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" className={TONE[tone].stroke} />
      {last && <circle cx={last.x} cy={last.y} r="2.6" className={TONE[tone].fill} />}
    </svg>
  );
}

/** Up, down or flat against the previous period. `null` means there was nothing to compare with. */
export function Delta({ change, suffix = "vs previous period", className }: { change: number | null; suffix?: string; className?: string }) {
  if (change === null) return <span className={cn("text-xs text-ink-400", className)}>New activity</span>;
  const Icon = change > 0 ? ArrowUpRight : change < 0 ? ArrowDownRight : Minus;
  return (
    <span className={cn("inline-flex items-center gap-1 text-xs", className)}>
      <span className={cn("inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-semibold", change > 0 && "bg-emerald-50 text-emerald-700", change < 0 && "bg-rose-50 text-rose-700", change === 0 && "bg-ink-100 text-ink-600")}>
        <Icon size={12} aria-hidden />
        {Math.abs(change)}%
      </span>
      <span className="text-ink-400">{suffix}</span>
    </span>
  );
}

/** One or more daily lines with light gridlines and a few labels on the x axis. */
export function AreaChart({ series, labels, className, label }: { series: { name: string; values: readonly number[]; tone: ChartTone }[]; labels: readonly string[]; className?: string; label: string }) {
  const W = 640;
  const H = 220;
  const pad = 28;
  const max = Math.max(1, ...series.flatMap((s) => s.values));
  const ticks = [0, 0.5, 1];
  const picks = labels.length ? [0, Math.floor((labels.length - 1) / 2), labels.length - 1] : [];
  return (
    <div className={className}>
      <svg role="img" aria-label={label} viewBox={`0 0 ${W} ${H}`} className="h-auto w-full">
        {ticks.map((tick) => {
          const y = H - pad - tick * (H - pad * 2);
          return (
            <g key={tick}>
              <line x1={pad} x2={W - pad} y1={y} y2={y} strokeDasharray="3 5" className="stroke-ink-200" />
              <text x={pad - 6} y={y + 3.5} textAnchor="end" className="fill-ink-400 text-[10px]">{Math.round(max * tick)}</text>
            </g>
          );
        })}
        {series.map((s, index) => {
          const points = plot(s.values, W, H, pad, max);
          return (
            <g key={s.name}>
              {index === 0 && <path d={`${line(points)} L${points.at(-1)?.x ?? pad} ${H - pad} L${points[0]?.x ?? pad} ${H - pad} Z`} className={TONE[s.tone].soft} />}
              <path d={line(points)} fill="none" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" className={TONE[s.tone].stroke} />
            </g>
          );
        })}
        {picks.map((pick, i) => (
          <text key={pick} x={pad + (pick / Math.max(1, labels.length - 1)) * (W - pad * 2)} y={H - 6} textAnchor={i === 0 ? "start" : i === picks.length - 1 ? "end" : "middle"} className="fill-ink-400 text-[10px]">
            {labels[pick]}
          </text>
        ))}
      </svg>
      {series.length > 1 && (
        <ul className="mt-2 flex flex-wrap gap-4 text-xs text-ink-500">
          {series.map((s) => (
            <li key={s.name} className="flex items-center gap-1.5"><span className={cn("h-2 w-2 rounded-md", TONE[s.tone].dot)} />{s.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

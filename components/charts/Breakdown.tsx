import { cn } from "@/lib/cn";
import type { FunnelStage, HeatCell } from "@/lib/analytics/series";
import { SEGMENT_TONES, TONE, type ChartTone } from "./tones";

/** A ring that shows one percentage, with the number in the middle. */
export function RingGauge({ percent, label, caption, tone = "primary", size = 112 }: { percent: number; label: string; caption?: string; tone?: ChartTone; size?: number }) {
  const r = 42;
  const circumference = 2 * Math.PI * r;
  const value = Math.max(0, Math.min(100, percent));
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg role="img" aria-label={label} viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" strokeWidth="9" className="stroke-ink-100" />
        <circle cx="50" cy="50" r={r} fill="none" strokeWidth="9" strokeLinecap="round" strokeDasharray={`${(value / 100) * circumference} ${circumference}`} className={TONE[tone].stroke} />
      </svg>
      <div className="absolute text-center leading-tight">
        <div className="text-2xl font-semibold tabular-nums">{value}%</div>
        {caption && <div className="text-[10px] font-medium uppercase tracking-wider text-ink-500">{caption}</div>}
      </div>
    </div>
  );
}

/** Shares of a whole as a ring, with a legend that lists every figure (so nothing depends on colour alone). */
export function Donut({ segments, centre, label }: { segments: { label: string; value: number }[]; centre?: { value: string | number; caption: string }; label: string }) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const r = 42;
  const circumference = 2 * Math.PI * r;
  const arcs = segments.reduce<{ length: number; offset: number }[]>((all, segment) => {
    const length = total === 0 ? 0 : (segment.value / total) * circumference;
    const offset = all.length ? all[all.length - 1].offset + all[all.length - 1].length : 0;
    return [...all, { length, offset }];
  }, []);
  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row">
      <div className="relative h-36 w-36 shrink-0">
        <svg role="img" aria-label={label} viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r={r} fill="none" strokeWidth="12" className="stroke-ink-100" />
          {segments.map((segment, i) => (
            <circle key={segment.label} cx="50" cy="50" r={r} fill="none" strokeWidth="12" strokeDasharray={`${Math.max(0, arcs[i].length - 1.5)} ${circumference}`} strokeDashoffset={-arcs[i].offset} className={TONE[SEGMENT_TONES[i % SEGMENT_TONES.length]].stroke} />
          ))}
        </svg>
        {centre && (
          <div className="absolute inset-0 grid place-items-center text-center leading-tight">
            <div>
              <div className="text-2xl font-semibold tabular-nums">{centre.value}</div>
              <div className="text-[10px] font-medium uppercase tracking-wider text-ink-500">{centre.caption}</div>
            </div>
          </div>
        )}
      </div>
      <ul className="w-full space-y-2 text-sm">
        {segments.map((segment, i) => (
          <li key={segment.label} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-2"><span className={cn("h-2.5 w-2.5 rounded-md", TONE[SEGMENT_TONES[i % SEGMENT_TONES.length]].dot)} />{segment.label}</span>
            <span className="tabular-nums text-ink-500">{segment.value}<span className="ml-1.5 text-ink-400">{total === 0 ? 0 : Math.round((segment.value / total) * 100)}%</span></span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Stages narrowing from left to right, each bar sized against the first stage, with the step conversion beside it. */
export function FunnelChart({ stages }: { stages: FunnelStage[] }) {
  return (
    <ol className="space-y-3">
      {stages.map((stage, index) => (
        <li key={stage.label}>
          <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
            <span className="font-medium">{stage.label}</span>
            <span className="tabular-nums text-ink-500">
              {stage.count}
              {index > 0 && <span className="ml-2 text-xs text-ink-400">{stage.ofPrevious}% of previous</span>}
            </span>
          </div>
          <div className="h-3 rounded-md bg-ink-100">
            <div className="h-3 rounded-md bg-gradient-to-r from-primary-400 to-primary-600" style={{ width: `${Math.max(stage.count > 0 ? 2 : 0, stage.ofFirst)}%` }} />
          </div>
        </li>
      ))}
    </ol>
  );
}

/** A histogram: one column per bucket, with the count above it and the range below. */
export function ColumnChart({ buckets, tone = "primary", label }: { buckets: { label: string; count: number }[]; tone?: ChartTone; label: string }) {
  const peak = Math.max(1, ...buckets.map((b) => b.count));
  return (
    <div role="img" aria-label={label} className="flex h-44 items-end gap-3">
      {buckets.map((bucket) => (
        <div key={bucket.label} className="flex h-full flex-1 flex-col justify-end text-center">
          <span className="mb-1 text-xs font-semibold tabular-nums text-ink-700">{bucket.count}</span>
          <div className={cn("w-full rounded-md", tone === "primary" ? "bg-primary-500" : tone === "emerald" ? "bg-emerald-500" : tone === "amber" ? "bg-amber-500" : "bg-violet-500")} style={{ height: `${Math.max(bucket.count > 0 ? 4 : 1, (bucket.count / peak) * 100)}%`, opacity: bucket.count === 0 ? 0.25 : 1 }} />
          <span className="mt-2 text-[11px] text-ink-500">{bucket.label}</span>
        </div>
      ))}
    </div>
  );
}

const LEVEL = ["bg-ink-100", "bg-primary-200", "bg-primary-300", "bg-primary-500", "bg-primary-700"] as const;
const DAY_FORMAT = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });

/** A contribution-style calendar: a square for each day, shaded by how much happened. Seven rows, one column per week. */
export function HeatCalendar({ cells, unit = "events" }: { cells: HeatCell[]; unit?: string }) {
  return (
    <div>
      <div role="img" aria-label={`Activity calendar, ${cells.filter((c) => c.count > 0).length} active days`} className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto pb-1">
        {cells.map((cell, index) =>
          cell.day === null ? (
            <span key={index} className="h-3.5 w-3.5" />
          ) : (
            <span key={index} title={`${DAY_FORMAT.format(cell.day)}: ${cell.count} ${unit}`} className={cn("h-3.5 w-3.5 rounded-md", LEVEL[cell.level])} />
          )
        )}
      </div>
      <div className="mt-3 flex items-center justify-end gap-1.5 text-[11px] text-ink-500">
        Less
        {LEVEL.map((level) => <span key={level} className={cn("h-3 w-3 rounded-md", level)} />)}
        More
      </div>
    </div>
  );
}

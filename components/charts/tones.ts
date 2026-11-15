export type ChartTone = "primary" | "emerald" | "amber" | "rose" | "violet" | "sky" | "ink";

/** Every class is written out in full so Tailwind can see it. */
export const TONE: Record<ChartTone, { stroke: string; fill: string; soft: string; text: string; dot: string }> = {
  primary: { stroke: "stroke-primary-500", fill: "fill-primary-500", soft: "fill-primary-500/15", text: "text-primary-600", dot: "bg-primary-500" },
  emerald: { stroke: "stroke-emerald-500", fill: "fill-emerald-500", soft: "fill-emerald-500/15", text: "text-emerald-600", dot: "bg-emerald-500" },
  amber: { stroke: "stroke-amber-500", fill: "fill-amber-500", soft: "fill-amber-500/15", text: "text-amber-600", dot: "bg-amber-500" },
  rose: { stroke: "stroke-rose-500", fill: "fill-rose-500", soft: "fill-rose-500/15", text: "text-rose-600", dot: "bg-rose-500" },
  violet: { stroke: "stroke-violet-500", fill: "fill-violet-500", soft: "fill-violet-500/15", text: "text-violet-600", dot: "bg-violet-500" },
  sky: { stroke: "stroke-sky-500", fill: "fill-sky-500", soft: "fill-sky-500/15", text: "text-sky-600", dot: "bg-sky-500" },
  ink: { stroke: "stroke-ink-500", fill: "fill-ink-500", soft: "fill-ink-500/15", text: "text-ink-600", dot: "bg-ink-500" },
};

/** Colours handed out in turn to the segments of a donut. */
export const SEGMENT_TONES: ChartTone[] = ["primary", "emerald", "amber", "violet", "sky", "rose"];

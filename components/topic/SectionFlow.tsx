import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { DividerName, PatternName } from "./look";
import { TopicPattern } from "./TopicPattern";

/** The background of a band. Each tone has a matching text colour, used to fill the divider that leads into it. */
export type BandTone = "white" | "tint" | "soft" | "dark" | "brand";

const BAND: Record<BandTone, string> = {
  white: "bg-white",
  tint: "bg-primary-50",
  soft: "bg-ink-50",
  dark: "bg-ink-950 text-white",
  brand: "bg-primary-800 text-white",
};
const FILL: Record<BandTone, string> = { white: "text-white", tint: "text-primary-50", soft: "text-ink-50", dark: "text-ink-950", brand: "text-primary-800" };
const FROM: Record<BandTone, string> = { white: "bg-white", tint: "bg-primary-50", soft: "bg-ink-50", dark: "bg-ink-950", brand: "bg-primary-800" };

function teeth(count: number) {
  const step = 1440 / count;
  return `M0 80${Array.from({ length: count }, (_, i) => ` L${(i * step + step / 2).toFixed(0)} 28 L${((i + 1) * step).toFixed(0)} 80`).join("")} Z`;
}

const SHAPES: Record<DividerName, string> = {
  wave: "M0 40C240 90 480 0 720 40S1200 80 1440 30V80H0Z",
  slant: "M0 80L1440 8V80Z",
  arch: "M0 80Q720 -40 1440 80Z",
  teeth: teeth(18),
};

/** The edge between two bands of different colour: the upper band's colour shows above the shape, the next band's below it. */
export function SectionDivider({ from, to, shape }: { from: BandTone; to: BandTone; shape: DividerName }) {
  return (
    <div aria-hidden className={cn("-mb-px leading-none", FROM[from])}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" focusable="false" className={cn("block h-10 w-full md:h-16", FILL[to])}>
        <path d={SHAPES[shape]} fill="currentColor" />
      </svg>
    </div>
  );
}

export interface FlowItem {
  key: string;
  tone: BandTone;
  /** Anchor id, for jump links. */
  id?: string;
  /** Narrower content column. */
  narrow?: boolean;
  node: ReactNode;
}

/**
 * Stacks a page's sections as coloured bands. Where one band's colour differs from the one above, a divider in the
 * page's shape leads in. Tinted and dark bands also carry the page's background pattern.
 */
export function SectionFlow({ items, shape, pattern, from = "dark" }: { items: FlowItem[]; shape: DividerName; pattern: PatternName; from?: BandTone }) {
  return (
    <>
      {items.map((item, index) => {
        const previous = index === 0 ? from : items[index - 1].tone;
        const dark = item.tone === "dark" || item.tone === "brand";
        return (
          <Fragment key={item.key}>
            {previous !== item.tone && <SectionDivider from={previous} to={item.tone} shape={shape} />}
            <section id={item.id} className={cn("relative overflow-hidden scroll-mt-20", BAND[item.tone])}>
              {(dark || item.tone === "tint" || item.tone === "soft") && <TopicPattern variant={pattern} tone={dark ? "dark" : "light"} />}
              <div className={cn("container relative py-16 md:py-24", item.narrow && "max-w-5xl")}>{item.node}</div>
            </section>
          </Fragment>
        );
      })}
    </>
  );
}

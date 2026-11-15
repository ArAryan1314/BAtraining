import { useId, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { PatternName } from "./look";

/** Tile size and the marks drawn in each tile. Marks inherit the stroke colour set on the pattern. */
const TILES: Record<PatternName, { w: number; h: number; marks: ReactNode }> = {
  grid: { w: 44, h: 44, marks: <path d="M44 0H0V44" fill="none" /> },
  dots: { w: 26, h: 26, marks: <circle cx="13" cy="13" r="1.6" className="fill-current stroke-none" /> },
  diagonal: { w: 22, h: 22, marks: <path d="M-6 6L6 -6M0 22L22 0M16 28L28 16" fill="none" /> },
  waves: { w: 64, h: 24, marks: <path d="M0 12Q16 0 32 12T64 12" fill="none" /> },
  rings: { w: 90, h: 90, marks: <><circle cx="45" cy="45" r="14" fill="none" /><circle cx="45" cy="45" r="30" fill="none" /></> },
  chevrons: { w: 44, h: 26, marks: <path d="M0 6L22 20L44 6" fill="none" /> },
  crosses: { w: 36, h: 36, marks: <path d="M18 12V24M12 18H24" fill="none" /> },
  circuit: { w: 72, h: 72, marks: <><path d="M0 36H22L30 28H50M50 28V0M50 28L58 36H72M30 28V72" fill="none" /><circle cx="50" cy="28" r="2.5" className="fill-current" /><circle cx="30" cy="60" r="2.5" className="fill-current" /></> },
  triangles: { w: 52, h: 46, marks: <path d="M26 6L46 40H6Z" fill="none" /> },
};

/**
 * A repeating background pattern for a banner or a section band. Each page picks one (see `topicLook`), so
 * the backdrop is part of what tells one page from the next. Place inside a `relative overflow-hidden` parent.
 */
export function TopicPattern({ variant, tone = "light", className }: { variant: PatternName; tone?: "light" | "dark"; className?: string }) {
  const id = `pattern-${useId().replace(/:/g, "")}`;
  const tile = TILES[variant];
  return (
    <svg aria-hidden focusable="false" className={cn("pointer-events-none absolute inset-0 h-full w-full", tone === "dark" ? "text-white/[0.09]" : "text-primary-500/[0.16]", className)}>
      <defs>
        <pattern id={id} width={tile.w} height={tile.h} patternUnits="userSpaceOnUse">
          <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
            {tile.marks}
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

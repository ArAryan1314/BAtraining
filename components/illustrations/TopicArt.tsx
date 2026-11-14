import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export type ArtScene = "path" | "growth" | "documents" | "dashboard";

const VIEW_W = 480;
const VIEW_H = 360;
const SCENES: readonly ArtScene[] = ["path", "growth", "documents", "dashboard"];

/**
 * Colour sets. Every class is written out in full so Tailwind can see it. Each set has a main colour, softer
 * tints of it, and a contrasting accent, so the four sets read as four different pieces of artwork.
 */
const PALETTES = [
  { main: "fill-primary-500", stroke: "stroke-primary-500", soft: "fill-primary-100", softStroke: "stroke-primary-200", softDark: "fill-primary-500/25", mid: "fill-primary-300", midStroke: "stroke-primary-300", accent: "fill-accent-400", accentStroke: "stroke-accent-500", accentSoft: "fill-accent-200", accentSoftDark: "fill-accent-400/25", badge: "bg-primary-600" },
  { main: "fill-emerald-500", stroke: "stroke-emerald-500", soft: "fill-emerald-100", softStroke: "stroke-emerald-200", softDark: "fill-emerald-500/25", mid: "fill-emerald-300", midStroke: "stroke-emerald-300", accent: "fill-amber-400", accentStroke: "stroke-amber-500", accentSoft: "fill-amber-200", accentSoftDark: "fill-amber-400/25", badge: "bg-emerald-600" },
  { main: "fill-amber-500", stroke: "stroke-amber-500", soft: "fill-amber-100", softStroke: "stroke-amber-200", softDark: "fill-amber-500/25", mid: "fill-amber-300", midStroke: "stroke-amber-300", accent: "fill-primary-500", accentStroke: "stroke-primary-500", accentSoft: "fill-primary-100", accentSoftDark: "fill-primary-500/25", badge: "bg-amber-600" },
  { main: "fill-rose-500", stroke: "stroke-rose-500", soft: "fill-rose-100", softStroke: "stroke-rose-200", softDark: "fill-rose-500/25", mid: "fill-rose-300", midStroke: "stroke-rose-300", accent: "fill-violet-500", accentStroke: "stroke-violet-500", accentSoft: "fill-violet-200", accentSoftDark: "fill-violet-400/25", badge: "bg-rose-600" },
] as const;

type Palette = (typeof PALETTES)[number];

function hashSeed(seed: string): number {
  let hash = 2166136261;
  for (const char of seed) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return hash >>> 0;
}

/** Small deterministic random number generator, so a page's artwork is the same on every render and every server. */
function seeded(seed: string) {
  let state = hashSeed(seed);
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Which scene and colour set a page gets. Derived from the seed alone, so it never changes and differs between pages. */
export function artSpec(seed: string): { scene: ArtScene; palette: number } {
  const hash = hashSeed(`spec:${seed}`);
  return { scene: SCENES[hash % SCENES.length], palette: (hash >>> 8) % PALETTES.length };
}

const between = (random: () => number, min: number, max: number) => min + random() * (max - min);

interface SceneProps {
  /** Each scene builds its own generator from this, so rendering it again always draws the same shapes. */
  seed: string;
  dark: boolean;
  p: Palette;
}

/** Window chrome shared by every scene. */
function Frame({ dark }: { dark: boolean }) {
  return (
    <>
      <rect x="12" y="12" width={VIEW_W - 24} height={VIEW_H - 24} rx="6" className={dark ? "fill-white/[0.04] stroke-white/15" : "fill-white stroke-ink-200"} strokeWidth="1.5" />
      <line x1="12" y1="46" x2={VIEW_W - 12} y2="46" className={dark ? "stroke-white/10" : "stroke-ink-100"} strokeWidth="1.5" />
      {[0, 1, 2].map((dot) => (
        <circle key={dot} cx={32 + dot * 16} cy="29" r="4" className={dark ? "fill-white/20" : ["fill-red-300", "fill-amber-300", "fill-emerald-300"][dot]} />
      ))}
    </>
  );
}

/** A learning track: nodes along a path, the first few completed, with progress bars beside it. */
function PathScene({ seed, dark, p }: SceneProps) {
  const random = seeded(seed);
  const count = 5;
  const done = 2 + Math.floor(random() * 3);
  const flip = random() > 0.5;
  const nodes = Array.from({ length: count }, (_, i) => {
    const x = flip ? VIEW_W - 48 - i * 66 : 48 + i * 66;
    return { x, y: 240 - Math.sin(i * 0.9 + random()) * 55 - i * 14 };
  });
  const line = nodes.map((node, i) => `${i ? "L" : "M"}${node.x.toFixed(1)} ${node.y.toFixed(1)}`).join(" ");
  const bars = [0, 1, 2].map(() => between(random, 0.35, 0.95));
  const barsX = flip ? 250 : 48;
  const cardX = flip ? 48 : 300;
  return (
    <>
      <path d={line} fill="none" strokeWidth="3" strokeDasharray="6 8" strokeLinecap="round" className={dark ? "stroke-white/25" : p.softStroke} />
      {nodes.map((node, i) => (
        <g key={i}>
          <circle cx={node.x} cy={node.y} r={i < done ? 13 : 11} className={i < done ? p.main : dark ? "fill-ink-900 stroke-white/30" : cn("fill-white", p.midStroke)} strokeWidth="2.5" />
          {i < done && <path d={`M${node.x - 5} ${node.y} l4 4 l7 -8`} fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-white" />}
        </g>
      ))}
      {bars.map((width, i) => (
        <g key={i}>
          <rect x={barsX} y={72 + i * 22} width="190" height="8" rx="4" className={dark ? "fill-white/10" : "fill-ink-100"} />
          <rect x={barsX} y={72 + i * 22} width={190 * width} height="8" rx="4" className={i === 0 ? p.accent : p.main} />
        </g>
      ))}
      <rect x={cardX} y="68" width="136" height="44" rx="6" className={dark ? p.softDark : p.soft} />
      <rect x={cardX + 12} y="80" width="60" height="7" rx="3.5" className={p.main} />
      <rect x={cardX + 12} y="94" width="92" height="6" rx="3" className={dark ? "fill-white/20" : p.mid} />
    </>
  );
}

/** A career: a rising run of bars with a trend line and a milestone marker. */
function GrowthScene({ seed, dark, p }: SceneProps) {
  const random = seeded(seed);
  const count = 6 + Math.floor(random() * 3);
  const spacing = 380 / count;
  const heights = Array.from({ length: count }, (_, i) => 50 + i * (150 / count) + between(random, -10, 14));
  const points = heights.map((height, i) => ({ x: 40 + spacing / 2 + i * spacing, y: 318 - height }));
  const line = points.map((point, i) => `${i ? "L" : "M"}${point.x.toFixed(1)} ${(point.y - 18).toFixed(1)}`).join(" ");
  const flag = 2 + Math.floor(random() * (count - 3));
  return (
    <>
      {[110, 170, 230, 290].map((y) => (
        <line key={y} x1="40" y1={y} x2={VIEW_W - 40} y2={y} className={dark ? "stroke-white/10" : "stroke-ink-100"} strokeWidth="1.5" />
      ))}
      {points.map((point, i) => (
        <rect key={i} x={point.x - spacing * 0.3} y={point.y} width={spacing * 0.6} height={318 - point.y} rx="4" className={i === flag ? p.main : dark ? "fill-white/15" : p.soft} />
      ))}
      <path d={line} fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={p.accentStroke} />
      {points.map((point, i) => (
        <circle key={i} cx={point.x} cy={point.y - 18} r="4.5" className={cn(dark ? "fill-ink-900" : "fill-white", p.accentStroke)} strokeWidth="2.5" />
      ))}
      <g transform={`translate(${points[flag].x - 36} ${points[flag].y - 64})`}>
        <rect width="72" height="26" rx="6" className="fill-ink-900" />
        <rect x="10" y="9" width="30" height="7" rx="3.5" className="fill-white" />
        <circle cx="56" cy="13" r="5" className="fill-emerald-400" />
      </g>
    </>
  );
}

/** A reference sheet: a fan of document cards with ruled lines and a highlighted row. */
function DocumentsScene({ seed, dark, p }: SceneProps) {
  const random = seeded(seed);
  const spread = between(random, 60, 85);
  const cards = [
    { x: 56, y: 84, rotate: -between(random, 3, 9) },
    { x: 56 + spread, y: 76, rotate: between(random, -2, 3) },
    { x: 56 + spread * 2, y: 90, rotate: between(random, 5, 11) },
  ];
  return (
    <>
      {cards.map((card, index) => {
        const lines = Array.from({ length: 6 }, () => between(random, 0.45, 1));
        const marked = Math.floor(random() * 6);
        return (
          <g key={index} transform={`rotate(${card.rotate} ${card.x + 80} ${card.y + 110}) translate(${card.x} ${card.y})`}>
            <rect width="160" height="210" rx="6" className={dark ? "fill-ink-900 stroke-white/20" : "fill-white stroke-ink-200"} strokeWidth="1.5" />
            <rect x="14" y="16" width={index === 1 ? 70 : 50} height="9" rx="4.5" className={index === 1 ? p.main : p.mid} />
            {lines.map((width, i) => (
              <g key={i}>
                {i === marked && <rect x="10" y={42 + i * 26 - 5} width="140" height="18" rx="3" className={dark ? p.accentSoftDark : p.accentSoft} />}
                <rect x="14" y={42 + i * 26} width={132 * width} height="7" rx="3.5" className={dark ? "fill-white/20" : "fill-ink-200"} />
              </g>
            ))}
          </g>
        );
      })}
      <rect x="352" y="84" width="92" height="30" rx="6" className={p.main} />
      <rect x="366" y="95" width="46" height="8" rx="4" className="fill-white" />
      <rect x="352" y="126" width="68" height="8" rx="4" className={dark ? "fill-white/20" : "fill-ink-200"} />
      <rect x="352" y="144" width="80" height="8" rx="4" className={dark ? "fill-white/20" : "fill-ink-200"} />
    </>
  );
}

/** A product dashboard: KPI tiles with tiny charts above a wide area chart. */
function DashboardScene({ seed, dark, p }: SceneProps) {
  const random = seeded(seed);
  const tiles = [0, 1, 2].map((i) => ({ x: 36 + i * 142, spark: Array.from({ length: 6 }, () => between(random, 6, 26)) }));
  const area = Array.from({ length: 9 }, (_, i) => ({ x: 36 + i * 50.5, y: 300 - between(random, 30, 110) }));
  const top = area.map((point, i) => `${i ? "L" : "M"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
  const accent = Math.floor(random() * 3);
  const marker = 2 + Math.floor(random() * 5);
  return (
    <>
      {tiles.map((tile, i) => (
        <g key={i} transform={`translate(${tile.x} 64)`}>
          <rect width="128" height="76" rx="6" className={i === accent ? p.main : dark ? "fill-white/[0.06] stroke-white/15" : "fill-ink-50 stroke-ink-200"} strokeWidth="1.5" />
          <rect x="12" y="12" width="40" height="7" rx="3.5" className={i === accent ? "fill-white/70" : dark ? "fill-white/25" : "fill-ink-300"} />
          <rect x="12" y="26" width="58" height="12" rx="4" className={i === accent ? "fill-white" : dark ? "fill-white/60" : "fill-ink-700"} />
          {tile.spark.map((height, bar) => (
            <rect key={bar} x={12 + bar * 14} y={66 - height} width="8" height={height} rx="2" className={i === accent ? "fill-white/60" : p.mid} />
          ))}
        </g>
      ))}
      <path d={`${top} L${area[area.length - 1].x} 318 L36 318 Z`} className={dark ? p.softDark : p.soft} />
      <path d={top} fill="none" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" className={p.stroke} />
      <circle cx={area[marker].x} cy={area[marker].y} r="6" className={cn(dark ? "fill-ink-900" : "fill-white", p.accentStroke)} strokeWidth="3" />
    </>
  );
}

/** The scene components, exported so tests can render them directly. */
export const artScenes = { path: PathScene, growth: GrowthScene, documents: DocumentsScene, dashboard: DashboardScene } as const;
const scenes = artScenes;
export const artPalettes = PALETTES;

/**
 * Decorative artwork for a page. Drawn in code from the design tokens, so it follows the theme, loads instantly,
 * and needs no image files. `seed` (use the page slug) decides the colours and the geometry, and the scene too
 * unless one is given, so every page gets its own piece.
 */
export function TopicArt({ scene, seed, icon: Icon, tone = "light", flush = false, className }: { scene?: ArtScene; seed: string; icon?: LucideIcon; tone?: "light" | "dark"; /** Edge-to-edge inside a card that supplies its own corners. */ flush?: boolean; className?: string }) {
  const dark = tone === "dark";
  const spec = artSpec(seed);
  const palette = PALETTES[spec.palette];
  const chosen = scene ?? spec.scene;
  const Scene = scenes[chosen];
  return (
    <figure aria-hidden className={cn("relative aspect-[4/3] w-full overflow-hidden", !flush && "rounded-md ring-1", dark ? "bg-ink-900/40" : "bg-gradient-to-br from-primary-50 via-white to-accent-200/30", !flush && (dark ? "ring-white/10" : "ring-line shadow-soft"), className)}>
      <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="h-full w-full" role="presentation" focusable="false">
        <Frame dark={dark} />
        <Scene seed={`${chosen}:${seed}`} dark={dark} p={palette} />
      </svg>
      {Icon && (
        <span className={cn("absolute bottom-5 right-5 grid h-14 w-14 place-items-center rounded-md text-white shadow-lift ring-4 ring-white/70", palette.badge)}>
          <Icon size={26} strokeWidth={1.75} />
        </span>
      )}
    </figure>
  );
}

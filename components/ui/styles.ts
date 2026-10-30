/**
 * Shared class recipes. Tailwind utility strings belong here or inside UI/domain
 * components, never in route/page files. Prefer these recipes before inventing
 * a new utility string.
 */
export const uiStyles = {
  section: "space-y-6",
  panel: "rounded-3xl border border-line bg-white shadow-sm",
  panelPadding: "p-6 sm:p-8",
  stack: "space-y-4",
  stackTight: "space-y-2",
  row: "flex items-center justify-between gap-4",
  rowWrap: "flex flex-wrap items-center gap-3",
  grid2: "grid gap-5 lg:grid-cols-2",
  grid3: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
  grid4: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
  mutedText: "text-sm leading-6 text-ink-500",
  eyebrow: "text-xs font-semibold uppercase tracking-[0.16em] text-primary-600",
  title: "mt-2 text-2xl font-semibold tracking-tight",
  subtle: "rounded-xl border border-line bg-surface-muted",
} as const;

export { cn } from "@/lib/cn";

import { cn } from "./styles";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type Tone = "light" | "dark";

/** Small pill label that sits above section titles. */
export function Eyebrow({ children, tone = "light", className }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium tracking-wide",
        tone === "light" && "border-primary-200/70 bg-primary-50/80 text-primary-700",
        tone === "dark" && "border-white/10 bg-white/5 text-primary-200 backdrop-blur",
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", tone === "light" ? "bg-primary-500" : "bg-accent-400")} />
      {children}
    </span>
  );
}

/**
 * Renders a title where `highlight` (a substring of `title`) is set in the
 * italic display face. Falls back to the plain title when no match is found.
 */
export function AccentTitle({ title, highlight, tone = "light" }: { title: string; highlight?: string; tone?: Tone }) {
  const index = highlight ? title.indexOf(highlight) : -1;
  if (!highlight || index === -1) return <>{title}</>;
  return (
    <>
      {title.slice(0, index)}
      <span
        className={cn(
          "font-display font-normal italic tracking-normal",
          tone === "light" ? "text-gradient-brand" : "text-gradient"
        )}
      >
        {highlight}
      </span>
      {title.slice(index + highlight.length)}
    </>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  tone = "light",
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "center" | "left";
  tone?: Tone;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "mx-auto max-w-3xl items-center text-center",
        align === "left" && "max-w-2xl items-start",
        className
      )}
    >
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl lg:text-[3.5rem]",
          tone === "light" ? "text-ink-900" : "text-white"
        )}
      >
        <AccentTitle title={title} highlight={highlight} tone={tone} />
      </h2>
      {description && (
        <p className={cn("max-w-2xl text-lg leading-8", tone === "light" ? "text-ink-500" : "text-ink-400")}>{description}</p>
      )}
      {action}
    </div>
  );
}

export function IconBadge({
  icon: Icon,
  variant = "default",
  size = "md",
  className,
}: {
  icon: LucideIcon;
  variant?: "default" | "brand" | "outline" | "dark";
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid shrink-0 place-items-center",
        size === "md" && "h-12 w-12 rounded-2xl",
        size === "sm" && "h-9 w-9 rounded-xl",
        variant === "default" && "border border-line bg-white text-ink-900 shadow-soft",
        variant === "brand" && "bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_8px_20px_-8px_rgb(69_73_229/0.7)]",
        variant === "outline" && "border border-primary-200 bg-primary-50 text-primary-600",
        variant === "dark" && "border border-white/10 bg-white/5 text-accent-300",
        className
      )}
    >
      <Icon size={size === "md" ? 22 : 18} strokeWidth={1.75} />
    </div>
  );
}

export function Chip({
  children,
  variant = "default",
  className,
}: {
  children: ReactNode;
  variant?: "default" | "brand" | "success" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        variant === "default" && "border border-line bg-white text-ink-700",
        variant === "brand" && "bg-primary-50 text-primary-700 ring-1 ring-primary-100",
        variant === "success" && "bg-success/10 text-success",
        variant === "dark" && "border border-white/10 bg-white/5 text-ink-300",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Metric({ value, label, className }: { value: string; label: string; className?: string }) {
  return (
    <div className={cn("text-center", className)}>
      <div className="text-4xl font-semibold tracking-tighter text-ink-900 md:text-5xl">{value}</div>
      <div className="mt-2 text-sm font-medium text-ink-500">{label}</div>
    </div>
  );
}

export function ProgressMeter({ label, percent, className }: { label: string; percent: number; className?: string }) {
  return (
    <div className={cn("w-full", className)}>
      <div className="mb-2 flex justify-between text-sm font-medium">
        <span className="text-white">{label}</span>
        <span className="tabular-nums text-primary-300">{percent}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-400" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

/** Ambient glow + grid backdrop for dark sections. Place inside a `relative overflow-hidden` parent. */
export function DarkBackdrop({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      <div className="absolute inset-0 bg-grid-dark mask-radial" />
      <div className="absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-primary-600/30 blur-[120px]" />
      <div className="absolute -bottom-40 right-0 h-[400px] w-[500px] rounded-full bg-accent-500/10 blur-[120px]" />
      <div className="absolute inset-0 bg-noise opacity-[0.15] mix-blend-overlay" />
    </div>
  );
}

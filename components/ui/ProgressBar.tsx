import { cn } from "@/lib/cn";

type ProgressBarVariant = "primary" | "success" | "neutral" | "dark";

export function ProgressBar({ value, className, variant = "primary", showLabel = false }: { value: number; className?: string; variant?: ProgressBarVariant; showLabel?: boolean }) {
  const safeValue = Math.max(0, Math.min(100, value));
  return <div className="w-full">
    {showLabel && <div className="mb-2 flex justify-between text-xs font-semibold"><span>Progress</span><span>{safeValue}%</span></div>}
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-gray-100", className)} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={safeValue}>
      <div className={cn("h-full rounded-full transition-all", variant === "primary" && "bg-primary-600", variant === "success" && "bg-success", variant === "neutral" && "bg-gray-400", variant === "dark" && "bg-white")} style={{ width: `${safeValue}%` }} />
    </div>
  </div>;
}

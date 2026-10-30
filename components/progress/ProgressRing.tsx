import { cn } from "@/lib/cn";

export function ProgressRing({ value, label, size = 96, stroke = 9, className }: { value: number; label?: string; size?: number; stroke?: number; className?: string }) {
  const radius = (size - stroke) / 2; const circumference = 2 * Math.PI * radius; const dash = circumference - (Math.max(0, Math.min(100, value)) / 100) * circumference;
  return <div className={cn("relative shrink-0", className)} style={{ width: size, height: size }}><svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90"><circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-gray-100" /><circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={dash} className="text-primary-600 transition-all" /></svg><div className="absolute inset-0 grid place-items-center text-center"><div><div className="text-xl font-black">{value}%</div>{label && <div className="text-[9px] font-semibold uppercase tracking-wider text-ink-500">{label}</div>}</div></div></div>;
}

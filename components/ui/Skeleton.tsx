import { cn } from "@/lib/cn";

export function Skeleton({ className }: { className?: string }) { return <div aria-hidden className={cn("animate-pulse rounded-lg bg-gray-100", className)} />; }
export function SkeletonText({ lines = 3 }: { lines?: number }) { return <div className="space-y-2">{Array.from({ length: lines }).map((_, i) => <Skeleton key={i} className={cn("h-3", i === lines - 1 && "w-2/3")} />)}</div>; }

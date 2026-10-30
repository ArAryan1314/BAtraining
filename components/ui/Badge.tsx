import { cn } from "@/lib/cn";

export function Badge({ tone = "neutral", children }: { tone?: "neutral" | "success" | "warning" | "danger" | "primary"; children: React.ReactNode }) {
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", tone === "neutral" && "bg-gray-100 text-gray-700", tone === "success" && "bg-green-50 text-green-700", tone === "warning" && "bg-amber-50 text-amber-700", tone === "danger" && "bg-red-50 text-red-700", tone === "primary" && "bg-primary-50 text-primary-700")}>{children}</span>;
}

import { cn } from "@/lib/cn";
import { Spinner } from "@/components/ui/Spinner";

export function LoadingOverlay({ visible, label = "Working..." }: { visible: boolean; label?: string }) {
  if (!visible) return null;
  return <div className={cn("fixed inset-0 z-[60] grid place-items-center bg-white/60 backdrop-blur-sm")}><div className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 text-sm font-semibold shadow-xl"><Spinner />{label}</div></div>;
}

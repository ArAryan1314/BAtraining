import { Inbox } from "lucide-react";
import { cn } from "@/lib/cn";

export function EmptyState({ title, description, action, icon: Icon = Inbox, className }: { title: string; description?: string; action?: React.ReactNode; icon?: React.ComponentType<{ size?: number; className?: string }>; className?: string }) {
  return <div className={cn("grid min-h-48 place-items-center rounded-xl border border-dashed border-line bg-white p-8 text-center", className)}><div><div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-surface-muted text-ink-500"><Icon size={22} /></div><h3 className="mt-4 font-semibold">{title}</h3>{description && <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-ink-500">{description}</p>}{action && <div className="mt-5">{action}</div>}</div></div>;
}

"use client";

import { cn } from "@/lib/cn";

export interface TabItem { id: string; label: string; count?: number }
export function Tabs({ items, value, onChange }: { items: TabItem[]; value: string; onChange?: (value: string) => void }) {
  return <div className="flex gap-1 overflow-x-auto rounded-xl bg-surface-muted p-1">{items.map(item => <button key={item.id} type="button" onClick={() => onChange?.(item.id)} className={cn("shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition", value === item.id ? "bg-white text-ink-900 shadow-sm" : "text-ink-500 hover:text-ink-900")}>{item.label}{typeof item.count === "number" && <span className="ml-2 rounded-full bg-surface-muted px-1.5 py-0.5 text-[10px]">{item.count}</span>}</button>)}</div>;
}

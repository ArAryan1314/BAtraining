"use client";

import { cn } from "@/lib/cn";

export function Switch({ checked, onChange, label }: { checked?: boolean; onChange?: (checked: boolean) => void; label?: string }) {
  return <label className="flex items-center gap-3 text-sm text-ink-700">
    <button type="button" role="switch" aria-checked={!!checked} onClick={() => onChange?.(!checked)} className={cn("relative h-6 w-11 rounded-full p-1 transition", checked ? "bg-primary-600" : "bg-gray-200")}><span className={cn("block h-4 w-4 rounded-full bg-white shadow-sm transition", checked && "translate-x-5")} /></button>
    {label && <span>{label}</span>}
  </label>;
}

import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Checkbox({ label, className, ...props }: InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return <label className="flex items-center gap-3 text-sm text-ink-700"><input type="checkbox" className={cn("h-4 w-4 rounded border-line accent-primary-600", className)} {...props} />{label && <span>{label}</span>}</label>;
}

import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface SelectOption { value: string; label: string; disabled?: boolean }

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement> & { label?: string; options?: SelectOption[]; error?: string }>(function Select({ label, options, error, className, id, children, ...props }, ref) {
  return <label className="block space-y-2" htmlFor={id}>
    {label && <span className="block text-sm font-semibold text-ink-900">{label}</span>}
    <select ref={ref} id={id} aria-invalid={!!error} className={cn("ui-field h-11 w-full px-3.5 text-sm text-ink-900 outline-none", className)} {...props}>
      {children ?? options?.map((option) => <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>)}
    </select>
    {error && <span className="block text-xs font-medium text-danger">{error}</span>}
  </label>;
});

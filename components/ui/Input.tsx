import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & { label?: string; hint?: string; error?: string }>(function Input({ label, hint, error, className, id, ...props }, ref) {
  return <label className="block space-y-2" htmlFor={id}>
    {label && <span className="block text-sm font-semibold text-ink-900">{label}</span>}
    <input ref={ref} id={id} aria-invalid={!!error} className={cn("ui-field h-11 w-full px-3.5 text-sm text-ink-900 outline-none placeholder:text-ink-500/70", className)} {...props} />
    {error ? <span className="block text-xs font-medium text-danger">{error}</span> : hint ? <span className="block text-xs text-ink-500">{hint}</span> : null}
  </label>;
});

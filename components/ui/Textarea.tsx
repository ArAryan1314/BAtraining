import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; hint?: string; error?: string }>(function Textarea({ label, hint, error, className, id, ...props }, ref) {
  return <label className="block space-y-2" htmlFor={id}>
    {label && <span className="block text-sm font-semibold text-ink-900">{label}</span>}
    <textarea ref={ref} id={id} aria-invalid={!!error} className={cn("ui-field min-h-28 w-full resize-y px-3.5 py-3 text-sm text-ink-900 outline-none placeholder:text-ink-500/70", className)} {...props} />
    {error ? <span className="block text-xs font-medium text-danger">{error}</span> : hint ? <span className="block text-xs text-ink-500">{hint}</span> : null}
  </label>;
});

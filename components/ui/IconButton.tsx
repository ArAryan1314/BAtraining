import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes } from "react";

export function IconButton({ label, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return <button aria-label={label} title={label} className={cn("grid h-10 w-10 place-items-center rounded-lg border border-line bg-white text-ink-700 transition hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500", className)} {...props} />;
}

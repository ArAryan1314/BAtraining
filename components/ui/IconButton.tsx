import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes } from "react";

export function IconButton({ label, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return <button aria-label={label} title={label} className={cn("grid h-10 w-10 place-items-center rounded-md border border-line bg-white text-ink-700 ui-row", className)} {...props} />;
}

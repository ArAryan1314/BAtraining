"use client";

import { X } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/cn";

export function Modal({ open, onClose, title, description, children, footer, size = "md" }: { open: boolean; onClose: () => void; title: string; description?: string; children: React.ReactNode; footer?: React.ReactNode; size?: "sm" | "md" | "lg" | "xl" }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-50 grid place-items-center bg-ink-900/40 p-4" role="dialog" aria-modal="true"><div className={cn("w-full rounded-xl border border-line bg-white shadow-2xl", size === "sm" && "max-w-sm", size === "md" && "max-w-lg", size === "lg" && "max-w-2xl", size === "xl" && "max-w-4xl")}><div className="flex items-start justify-between gap-4 border-b border-line p-5"><div><h2 className="text-lg font-semibold">{title}</h2>{description && <p className="mt-1 text-sm text-ink-500">{description}</p>}</div><IconButton label="Close" onClick={onClose}><X size={18} /></IconButton></div><div className="p-5">{children}</div>{footer && <div className="flex justify-end gap-2 border-t border-line p-5">{footer}</div>}</div></div>;
}

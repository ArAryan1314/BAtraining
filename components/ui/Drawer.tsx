"use client";

import { X } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/cn";

export function Drawer({ open, onClose, title, children, side = "right" }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode; side?: "left" | "right" }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-50 bg-ink-900/30" role="dialog" aria-modal="true"><div className={cn("absolute top-0 h-full w-full max-w-md bg-white shadow-2xl", side === "right" ? "right-0" : "left-0")}><div className="flex items-center justify-between border-b border-line p-5"><h2 className="font-semibold">{title}</h2><IconButton label="Close" onClick={onClose}><X size={18} /></IconButton></div><div className="h-[calc(100%-73px)] overflow-y-auto p-5">{children}</div></div></div>;
}

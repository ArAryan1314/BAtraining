"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";

export function DropdownMenu({ items }: { items: { label: string; onSelect?: () => void; danger?: boolean }[] }) {
  const [open, setOpen] = useState(false);
  return <div className="relative"><IconButton label="More actions" onClick={() => setOpen(v => !v)}><MoreHorizontal size={18} /></IconButton>{open && <div className="absolute right-0 z-30 mt-2 min-w-44 rounded-lg border border-line bg-white p-1 shadow-xl">{items.map(item => <button key={item.label} type="button" onClick={() => { item.onSelect?.(); setOpen(false); }} className={"block w-full rounded-lg px-3 py-2 text-left text-sm font-medium hover:bg-surface-muted " + (item.danger ? "text-danger" : "text-ink-700")}>{item.label}</button>)}</div>}</div>;
}

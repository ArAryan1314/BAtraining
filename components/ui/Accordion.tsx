"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { useState } from "react";

export function Accordion({ items }: { items: { id: string; title: string; content: React.ReactNode }[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  return <section className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-white">{items.map(item => <div key={item.id}><button type="button" onClick={() => setOpen(open === item.id ? null : item.id)} className="flex w-full items-center justify-between gap-4 p-4 text-left text-sm font-semibold"><span>{item.title}</span><ChevronDown size={16} className={cn("transition", open === item.id && "rotate-180")} /></button>{open === item.id && <div className="px-4 pb-4 text-sm leading-6 text-ink-500">{item.content}</div>}</div>)}</section>;
}

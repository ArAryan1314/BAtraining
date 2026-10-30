import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return <nav aria-label="Breadcrumb" className="flex items-center gap-1 overflow-x-auto text-xs font-semibold text-ink-500"><Link href="/" aria-label="Home" className="shrink-0 hover:text-ink-900"><Home size={14}/></Link>{items.map((item) => <span key={item.label} className="flex shrink-0 items-center gap-1"><ChevronRight size={13}/>{item.href ? <Link href={item.href} className="hover:text-ink-900">{item.label}</Link> : <span className="text-ink-900">{item.label}</span>}</span>)}</nav>;
}

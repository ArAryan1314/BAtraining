"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { navGroups } from "./navigation-data";

const CLOSE_DELAY = 140;

export function MegaMenu({ tone, onOpenChange }: { tone: "dark" | "light"; onOpenChange?: (open: boolean) => void }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenId(null), CLOSE_DELAY);
  };

  useEffect(() => onOpenChange?.(openId !== null), [openId, onOpenChange]);

  useEffect(() => {
    if (!openId) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpenId(null);
    const onClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) setOpenId(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [openId]);

  useEffect(() => cancelClose, []);

  return (
    <nav ref={navRef} aria-label="Main" className="hidden h-full items-center lg:flex" onMouseLeave={scheduleClose} onMouseEnter={cancelClose}>
      <ul className="flex items-center gap-0.5">
        {navGroups.map((group) => {
          const isOpen = openId === group.id;
          return (
            <li key={group.id} onMouseEnter={() => setOpenId(group.id)}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`mega-${group.id}`}
                onClick={() => setOpenId(isOpen ? null : group.id)}
                className={cn(
                  "flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                  tone === "dark" ? "text-ink-600 hover:bg-ink-100 hover:text-ink-900" : "text-white/75 hover:bg-white/10 hover:text-white",
                  isOpen && (tone === "dark" ? "bg-ink-100 text-ink-900" : "bg-white/10 text-white")
                )}
              >
                {group.label}
                <ChevronDown size={14} className={cn("transition-transform duration-300", isOpen && "rotate-180")} />
              </button>
            </li>
          );
        })}
        <li>
          <Link
            href="/about"
            className={cn(
              "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
              tone === "dark" ? "text-ink-600 hover:bg-ink-100 hover:text-ink-900" : "text-white/75 hover:bg-white/10 hover:text-white"
            )}
          >
            About
          </Link>
        </li>
      </ul>

      {navGroups.map((group) => {
        const isOpen = openId === group.id;
        const wide = group.links.length > 8;
        return (
          <div
            key={group.id}
            id={`mega-${group.id}`}
            className={cn(
              "absolute inset-x-0 top-full pt-3 transition-all duration-300 ease-out",
              isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0 pointer-events-none"
            )}
          >
            <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-ink-200/70 bg-white shadow-[0_32px_64px_-24px_rgb(18_21_29/0.3)]">
              <div className="grid grid-cols-[1fr_300px]">
                <ul className={cn("grid gap-1 p-4", wide ? "grid-cols-3" : "grid-cols-2")}>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setOpenId(null)}
                        tabIndex={isOpen ? 0 : -1}
                        className="group/link flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-ink-50 focus-visible:bg-ink-50 focus-visible:outline-none"
                      >
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-white text-ink-500 shadow-soft transition-all duration-300 group-hover/link:border-primary-200 group-hover/link:bg-primary-50 group-hover/link:text-primary-600">
                          <link.icon size={18} strokeWidth={1.75} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-ink-900">{link.label}</span>
                          <span className="mt-0.5 block text-[13px] leading-snug text-ink-500">{link.description}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={group.featured.href}
                  onClick={() => setOpenId(null)}
                  tabIndex={isOpen ? 0 : -1}
                  className="group/feat relative m-2 flex flex-col justify-end overflow-hidden rounded-2xl bg-ink-950 p-6 text-white"
                >
                  <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary-500/40 blur-3xl transition-transform duration-700 group-hover/feat:scale-125" />
                  <div aria-hidden className="absolute inset-0 bg-grid-dark opacity-60 mask-radial" />
                  <span className="relative text-xs font-medium uppercase tracking-[0.14em] text-accent-300">{group.featured.eyebrow}</span>
                  <span className="relative mt-3 text-xl font-semibold leading-tight tracking-tight">{group.featured.title}</span>
                  <span className="relative mt-2 text-sm leading-relaxed text-ink-400">{group.featured.description}</span>
                  <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                    {group.featured.cta}
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover/feat:translate-x-1" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </nav>
  );
}

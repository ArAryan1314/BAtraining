"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";
import { BrandMark } from "@/components/layout/public/BrandMark";
import { companyLinks, navGroups, type NavLink } from "./navigation-data";

function MobileGroup({ label, links, onNavigate }: { label: string; links: NavLink[]; onNavigate: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-line">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left text-lg font-semibold text-ink-900 outline-none focus-visible:text-primary-600"
      >
        {label}
        <ChevronDown size={18} className={cn("text-ink-400 transition-transform duration-300", isOpen && "rotate-180 text-primary-600")} />
      </button>
      <div className={cn("grid transition-all duration-300 ease-out", isOpen ? "grid-rows-[1fr] pb-4 opacity-100" : "grid-rows-[0fr] opacity-0")}>
        <ul className="grid min-h-0 grid-cols-1 gap-1 overflow-hidden sm:grid-cols-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={onNavigate} className="flex items-center gap-3 rounded-xl px-2 py-2.5 hover:bg-ink-50">
                <span className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-white text-primary-600">
                  <link.icon size={16} strokeWidth={1.75} />
                </span>
                <span className="text-sm font-medium text-ink-700">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const subscribeToNothing = () => () => {};

export function MobileHamburger({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useSyncExternalStore(subscribeToNothing, () => true, () => false);
  const close = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setIsOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        aria-expanded={isOpen}
        className={cn(
          "grid h-10 w-10 place-items-center rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
          tone === "dark" ? "text-ink-900 hover:bg-ink-100" : "text-white hover:bg-white/10"
        )}
      >
        <Menu size={20} />
      </button>

      {mounted &&
        createPortal(
          <div className={cn("fixed inset-0 z-[100] lg:hidden", !isOpen && "pointer-events-none")} aria-hidden={!isOpen}>
            <div
              onClick={close}
              className={cn("absolute inset-0 bg-ink-950/40 backdrop-blur-sm transition-opacity duration-300", isOpen ? "opacity-100" : "opacity-0")}
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className={cn(
                "absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isOpen ? "translate-x-0" : "translate-x-full"
              )}
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <BrandMark onClick={close} />
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-full bg-ink-100 text-ink-900 hover:bg-ink-200"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5">
                {navGroups.map((group) => (
                  <MobileGroup key={group.id} label={group.label} links={group.links} onNavigate={close} />
                ))}
                <MobileGroup label="Company" links={companyLinks} onNavigate={close} />
              </div>

              <div className="grid grid-cols-2 gap-3 border-t border-line p-5">
                <ButtonLink href="/auth/login" variant="outline" onClick={close}>
                  Sign in
                </ButtonLink>
                <ButtonLink href="/contact" onClick={close}>
                  Apply now
                </ButtonLink>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

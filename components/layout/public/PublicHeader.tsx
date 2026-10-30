"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";
import { MegaMenu } from "@/components/layout/navigation/MegaMenu";
import { MobileHamburger } from "@/components/layout/navigation/MobileHamburger";
import { BrandMark } from "./BrandMark";

/**
 * Floating header. Transparent with light text over the dark page heroes, and a
 * frosted light bar once the page scrolls.
 */
export function PublicHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || menuOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <div
        className={cn(
          "mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 rounded-full border pl-4 pr-2 transition-all duration-300 sm:pl-5",
          solid
            ? "border-ink-200/70 bg-white/80 shadow-[0_8px_32px_-12px_rgb(18_21_29/0.18)] backdrop-blur-xl backdrop-saturate-150"
            : "border-white/10 bg-ink-950/30 backdrop-blur-md"
        )}
      >
        <BrandMark tone={solid ? "dark" : "light"} />

        <MegaMenu tone={solid ? "dark" : "light"} onOpenChange={setMenuOpen} key={pathname} />

        <div className="flex items-center gap-1.5">
          <ButtonLink
            href="/auth/login"
            variant="ghost"
            size="sm"
            className={cn("hidden md:inline-flex", !solid && "text-white/80 hover:bg-white/10 hover:text-white")}
          >
            Sign in
          </ButtonLink>
          <ButtonLink href="/contact" variant={solid ? "primary" : "light"} size="sm" className="hidden sm:inline-flex">
            Apply now
          </ButtonLink>
          <MobileHamburger tone={solid ? "dark" : "light"} />
        </div>
      </div>
    </header>
  );
}

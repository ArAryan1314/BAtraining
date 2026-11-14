"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const SHOW_AFTER_PX = 320;
const RING_RADIUS = 20;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

function readProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  return scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
}

/**
 * A thin reading-progress bar across the top of the viewport, and a back-to-top button whose ring fills as
 * the page scrolls. Both are driven by one passive scroll listener, throttled with requestAnimationFrame.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setProgress(readProgress());
      setScrolled(window.scrollY > SHOW_AFTER_PX);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  function scrollToTop() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  const percent = Math.round(progress * 100);

  return (
    <div className="print:hidden">
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] bg-transparent">
        <div className="h-full origin-left bg-primary-600" style={{ transform: `scaleX(${progress})` }} />
      </div>
      <button
        type="button"
        onClick={scrollToTop}
        aria-label={`Back to top, ${percent}% of the page read`}
        tabIndex={scrolled ? 0 : -1}
        aria-hidden={!scrolled}
        className={`ui-press fixed bottom-5 right-5 z-[70] grid h-12 w-12 place-items-center rounded-full bg-white text-ink-700 shadow-lift transition-[opacity,transform] duration-200 sm:bottom-8 sm:right-8 ${scrolled ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
      >
        <svg aria-hidden viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90">
          <circle cx="24" cy="24" r={RING_RADIUS} fill="none" strokeWidth="3" className="stroke-ink-200" />
          <circle cx="24" cy="24" r={RING_RADIUS} fill="none" strokeWidth="3" strokeLinecap="round" className="stroke-primary-600" strokeDasharray={RING_LENGTH} strokeDashoffset={RING_LENGTH * (1 - progress)} />
        </svg>
        <ArrowUp size={18} aria-hidden className="relative" />
      </button>
    </div>
  );
}

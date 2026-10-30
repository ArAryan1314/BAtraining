import Link from "next/link";
import { cn } from "@/lib/cn";

/** BA Upskill wordmark with a geometric glyph. */
export function BrandMark({ tone = "dark", className, onClick }: { tone?: "dark" | "light"; className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="BA Upskill home"
      className={cn("group inline-flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary-500", className)}
    >
      <span className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-[10px] bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 shadow-[inset_0_1px_0_rgb(255_255_255/0.3),0_6px_16px_-6px_rgb(69_73_229/0.8)] transition-transform duration-300 group-hover:rotate-[-6deg]">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 17 10 11l4 4 6-8" />
          <path d="M15 7h5v5" />
        </svg>
      </span>
      <span className={cn("text-[17px] font-semibold tracking-tight", tone === "dark" ? "text-ink-900" : "text-white")}>
        BA<span className={tone === "dark" ? "text-primary-600" : "text-primary-300"}>Upskill</span>
      </span>
    </Link>
  );
}

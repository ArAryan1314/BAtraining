import Link from "next/link";
import { BrandMark } from "./public/BrandMark";
import { careerLinks, companyLinks, programLinks, resourceLinks, trackLinks } from "./navigation/navigation-data";

const columns = [
  { title: "Program", links: programLinks.slice(0, 6) },
  { title: "Tracks", links: trackLinks.slice(0, 6) },
  { title: "Career", links: careerLinks },
  { title: "Resources", links: resourceLinks.slice(0, 6) },
  { title: "Company", links: companyLinks },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-ink-400">
      <div aria-hidden className="absolute inset-0 bg-grid-dark mask-fade-b opacity-60" />
      <div aria-hidden className="absolute -top-48 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-primary-700/20 blur-[120px]" />

      <div className="container relative">
        <div className="grid gap-10 pb-14 pt-20 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(5,1fr)]">
          <div className="max-w-xs">
            <BrandMark tone="light" />
            <p className="mt-4 text-sm leading-6">
              A practical business analysis learning platform built around knowledge, practice and evidence.
            </p>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white">{column.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} BA Upskill. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse-ring rounded-full bg-accent-400" />
            Enrolment open for the next cohort
          </p>
        </div>
      </div>
    </footer>
  );
}

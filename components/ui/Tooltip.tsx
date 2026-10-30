export function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return <span className="group relative inline-flex">{children}<span role="tooltip" className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-ink-900 px-2 py-1 text-[11px] font-semibold text-white shadow-lg group-hover:block">{label}</span></span>;
}

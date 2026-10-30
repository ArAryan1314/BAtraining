export function Divider({ label }: { label?: string }) {
  return <div className="flex items-center gap-3"><div className="h-px flex-1 bg-line" />{label && <span className="text-xs font-semibold uppercase tracking-wider text-ink-500">{label}</span>}<div className="h-px flex-1 bg-line" /></div>;
}

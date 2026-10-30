export function SectionHeading({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: React.ReactNode }) {
  return <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><div className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary-600">{eyebrow}</div><h2 className="text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">{title}</h2>{description && <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-500">{description}</p>}</div>{action}</div>;
}

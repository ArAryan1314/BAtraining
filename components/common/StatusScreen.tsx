import { Card } from "@/components/ui";

/** Centered message for not-found, error and verification results. */
export function StatusScreen({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: React.ReactNode }) {
  return (
    <div className="grid min-h-screen place-items-center bg-surface-muted p-4">
      <Card variant="elevated" className="w-full max-w-md p-8 text-center">
        <div className="text-xs font-semibold uppercase tracking-wider text-primary-600">{eyebrow}</div>
        <h1 className="mt-2 text-2xl font-black">{title}</h1>
        <p className="mt-2 text-sm text-ink-500">{description}</p>
        {children && <div className="mt-6 flex flex-wrap justify-center gap-3">{children}</div>}
      </Card>
    </div>
  );
}

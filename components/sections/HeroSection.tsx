import { ArrowRight } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";

export function HeroSection({ eyebrow, title, description, primaryAction, secondaryAction, side, tone = "gradient" }: { eyebrow?: string; title: string; description: string; primaryAction?: { label: string; onClick?: () => void; href?: string }; secondaryAction?: React.ReactNode; side?: React.ReactNode; tone?: "gradient" | "dark" | "plain" }) {
  const primaryVariant = tone === "plain" ? "primary" : "secondary";
  return (
    <section className="container py-12">
      <div className={"overflow-hidden rounded-lg p-6 sm:p-10 " + (tone === "gradient" ? "bg-linear-to-br from-primary-700 to-primary-900 text-white" : tone === "dark" ? "bg-ink-900 text-white" : "border border-line bg-white")}>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div className="max-w-2xl">
            {eyebrow && <div className="text-xs font-semibold uppercase tracking-[0.18em] opacity-70">{eyebrow}</div>}
            <h1 className="mt-3">{title}</h1>
            <p className="mt-5 opacity-75">{description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              {primaryAction?.href && <ButtonLink href={primaryAction.href} size="lg" variant={primaryVariant}>{primaryAction.label}<ArrowRight size={16} /></ButtonLink>}
              {primaryAction && !primaryAction.href && <Button size="lg" variant={primaryVariant} onClick={primaryAction.onClick}>{primaryAction.label}<ArrowRight size={16} /></Button>}
              {secondaryAction}
            </div>
          </div>
          {side && <div>{side}</div>}
        </div>
      </div>
    </section>
  );
}

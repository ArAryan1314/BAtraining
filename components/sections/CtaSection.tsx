import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function CtaSection({ title, description, action, buttonText, buttonHref, tone = "dark" }: { title: string; description: string; action?: React.ReactNode; buttonText?: string; buttonHref?: string; tone?: "dark" | "primary" | "plain" }) { 
  const ctaAction = action || (buttonText && buttonHref ? <Link href={buttonHref}><Button variant={tone === "dark" || tone === "primary" ? "secondary" : "primary"}>{buttonText}</Button></Link> : null);
  return (
    <section className="container py-16">
      <div className={"rounded-lg p-6 sm:p-8 " + (tone === "dark" ? "bg-ink-900 text-white" : tone === "primary" ? "bg-primary-600 text-white" : "border border-line bg-white")}>
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-2xl font-black tracking-tight">{title}</h2>
            <p className={"mt-2 max-w-2xl text-sm leading-6 " + (tone === "plain" ? "text-ink-500" : "text-white/70")}>{description}</p>
          </div>
          {ctaAction}
        </div>
      </div>
    </section>
  );
}

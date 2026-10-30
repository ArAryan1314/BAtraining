import Link from "next/link";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { AccentTitle, DarkBackdrop, Eyebrow } from "@/components/ui/marketing-primitives";
import { Motion } from "@/components/ui/motion/Motion";
import type { TopicContent } from "@/content/topics";

const categoryLabel: Record<TopicContent["category"], string> = {
  learn: "Learn",
  career: "Career",
  resources: "Resources",
  platform: "Platform",
};

export function TopicHero({ topic }: { topic: TopicContent }) {
  return (
    <section className="relative overflow-hidden bg-ink-950 pb-16 pt-32 text-white md:pb-24 md:pt-40">
      <DarkBackdrop />
      <div className="container relative">
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-1.5 text-sm text-ink-400">
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <ChevronRight size={14} className="text-ink-600" />
          <span>{categoryLabel[topic.category]}</span>
          <ChevronRight size={14} className="text-ink-600" />
          <span className="text-ink-200">{topic.title}</span>
        </nav>

        <div className="grid items-end gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div>
            <Motion animation="blur-in">
              <Eyebrow tone="dark">{topic.eyebrow}</Eyebrow>
              <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                <AccentTitle title={topic.title} highlight={topic.highlight} tone="dark" />
              </h1>
            </Motion>
            <Motion animation="slide-up" delay={120}>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-300 md:text-xl">{topic.summary}</p>
            </Motion>
            <Motion animation="slide-up" delay={220}>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href="/contact" variant="glow" size="lg">
                  Apply now <ArrowRight size={16} className="transition-transform group-hover/button:translate-x-0.5" />
                </ButtonLink>
                <ButtonLink href="/curriculum" variant="glass" size="lg">
                  See the curriculum
                </ButtonLink>
              </div>
            </Motion>
          </div>

          <Motion animation="slide-up" delay={300}>
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl sm:p-7">
              <div aria-hidden className="absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-primary-300/60 to-transparent" />
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent-300">You will be able to</p>
              <ul className="mt-5 space-y-3.5">
                {topic.outcomes.slice(0, 5).map((outcome) => (
                  <li key={outcome} className="flex gap-3 text-[15px] leading-6 text-ink-200">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary-500/20 text-primary-200 ring-1 ring-primary-400/30">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          </Motion>
        </div>

        {topic.meta.length > 0 && (
          <Motion animation="fade-in" delay={400}>
            <dl className="mt-14 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] md:grid-cols-4">
              {topic.meta.slice(0, 4).map((item) => (
                <div key={item.label} className="border-white/10 p-5 not-last:border-r max-md:[&:nth-child(2)]:border-r-0 max-md:[&:nth-child(-n+2)]:border-b">
                  <dt className="text-xs font-medium uppercase tracking-[0.12em] text-ink-500">{item.label}</dt>
                  <dd className="mt-1.5 text-base font-semibold text-white">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Motion>
        )}
      </div>
    </section>
  );
}

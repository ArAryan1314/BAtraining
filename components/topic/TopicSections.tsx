import Link from "next/link";
import { ArrowUpRight, FileText, Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import { Chip, IconBadge, SectionHeader } from "@/components/ui/marketing-primitives";
import { Motion, Stagger } from "@/components/ui/motion/Motion";
import type { TopicContent } from "@/content/topics";
import { CodeWindow } from "./CodeWindow";
import { topicIconMap } from "./topic-icons";

export function TopicOverview({ topic }: { topic: TopicContent }) {
  return (
    <section className="py-20 md:py-28">
      <div className="container grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader eyebrow="Overview" title={topic.overview.heading} align="left" />
        </div>
        <div>
          <Stagger className="space-y-6">
            {topic.overview.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="text-lg leading-8 text-ink-600 first:text-xl first:leading-9 first:text-ink-800">
                {paragraph}
              </p>
            ))}
          </Stagger>
          {topic.tools && topic.tools.length > 0 && (
            <Motion className="mt-10 rounded-2xl border border-line bg-ink-50/60 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">Tools you will use</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {topic.tools.map((tool) => (
                  <Chip key={tool}>{tool}</Chip>
                ))}
              </div>
            </Motion>
          )}
        </div>
      </div>
    </section>
  );
}

export function TopicConcepts({ topic }: { topic: TopicContent }) {
  return (
    <section className="relative overflow-hidden border-y border-line bg-ink-50/70 py-20 md:py-28">
      <div aria-hidden className="absolute inset-0 bg-grid mask-radial opacity-70" />
      <div className="container relative">
        <SectionHeader eyebrow="Key concepts" title="What you need to master" highlight="master" />
        <Stagger className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3" itemClassName="h-full">
          {topic.concepts.map((concept, index) => (
            <article
              key={concept.title}
              className="group relative h-full overflow-hidden rounded-3xl border border-line bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-primary-200 hover:shadow-lift"
            >
              <div aria-hidden className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary-400/0 blur-2xl transition-colors duration-500 group-hover:bg-primary-400/20" />
              <div className="flex items-start justify-between">
                <IconBadge icon={topicIconMap[concept.icon]} variant="brand" />
                <span className="font-mono text-xs text-ink-300">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight text-ink-900">{concept.title}</h3>
              <p className="mt-2.5 text-[15px] leading-7 text-ink-500">{concept.description}</p>
            </article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function TopicSteps({ steps }: { steps: NonNullable<TopicContent["steps"]> }) {
  return (
    <section className="py-20 md:py-28">
      <div className="container grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            eyebrow="How it works"
            title="Step by step"
            highlight="step"
            description="The sequence practising BAs follow — each step builds on the evidence from the last."
            align="left"
          />
        </div>
        <ol className="relative">
          <div aria-hidden className="absolute bottom-6 left-[23px] top-6 w-px bg-gradient-to-b from-primary-400 via-primary-200 to-transparent" />
          {steps.map((step, index) => (
            <Motion as="li" key={step.title} delay={index * 80} className="relative flex gap-6 pb-10 last:pb-0">
              <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-primary-200 bg-white font-mono text-sm font-semibold text-primary-600 shadow-soft">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="pt-2.5">
                <h3 className="text-xl font-semibold tracking-tight text-ink-900">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-7 text-ink-500">{step.description}</p>
              </div>
            </Motion>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function TopicExample({ example }: { example: NonNullable<TopicContent["example"]> }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-primary-50/40 to-white py-20 md:py-28">
      <div className="container">
        <SectionHeader eyebrow="Worked example" title={example.title} />
        <Motion className="mx-auto mt-12 max-w-4xl">
          <CodeWindow {...example} title={example.language === "text" ? "Example" : example.language.toUpperCase()} />
        </Motion>
      </div>
    </section>
  );
}

export function TopicArtifacts({ artifacts }: { artifacts: NonNullable<TopicContent["artifacts"]> }) {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 text-white md:py-28">
      <div aria-hidden className="absolute inset-0 bg-grid-dark mask-radial" />
      <div aria-hidden className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-primary-600/25 blur-[120px]" />
      <div className="container relative">
        <SectionHeader
          eyebrow="Deliverables"
          title="What you will produce"
          highlight="produce"
          description="Tangible artifacts reviewed against the standard a lead BA would expect on a live project."
          tone="dark"
        />
        <Stagger className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3" itemClassName="h-full">
          {artifacts.map((artifact) => (
            <article
              key={artifact.name}
              className="group h-full rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-colors duration-300 hover:border-primary-400/40 hover:bg-white/[0.06]"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary-400/30 to-accent-400/10 text-accent-200 ring-1 ring-white/10">
                  <FileText size={18} strokeWidth={1.75} />
                </span>
                <h3 className="text-lg font-semibold tracking-tight">{artifact.name}</h3>
              </div>
              <p className="mt-4 text-[15px] leading-7 text-ink-400">{artifact.description}</p>
            </article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function TopicTerms({ terms }: { terms: NonNullable<TopicContent["terms"]> }) {
  const sorted = [...terms].sort((a, b) => a.term.localeCompare(b.term));
  const letters = Array.from(new Set(sorted.map((t) => t.term[0].toUpperCase())));

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <SectionHeader eyebrow="A–Z" title="The working vocabulary of a BA" highlight="vocabulary" />
        <nav aria-label="Glossary letters" className="sticky top-20 z-10 mx-auto mt-10 flex max-w-max flex-wrap justify-center gap-1 rounded-full border border-line bg-white/90 p-1.5 shadow-soft backdrop-blur">
          {letters.map((letter) => (
            <a key={letter} href={`#letter-${letter}`} className="grid h-8 w-8 place-items-center rounded-full text-sm font-semibold text-ink-600 transition-colors hover:bg-primary-600 hover:text-white">
              {letter}
            </a>
          ))}
        </nav>
        <dl className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-2">
          {sorted.map((item, index) => {
            const firstOfLetter = index === 0 || sorted[index - 1].term[0].toUpperCase() !== item.term[0].toUpperCase();
            return (
              <div
                key={item.term}
                id={firstOfLetter ? `letter-${item.term[0].toUpperCase()}` : undefined}
                className="scroll-mt-36 rounded-2xl border border-line bg-white p-6 transition-colors hover:border-primary-200"
              >
                <dt className="flex items-center gap-3 text-lg font-semibold text-ink-900">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary-50 font-mono text-xs text-primary-600">{item.term[0].toUpperCase()}</span>
                  {item.term}
                </dt>
                <dd className="mt-2.5 text-[15px] leading-7 text-ink-500">{item.definition}</dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

export function TopicFaq({ faqs, large = false }: { faqs: TopicContent["faqs"]; large?: boolean }) {
  return (
    <section className={cn("py-20 md:py-28", !large && "border-t border-line bg-ink-50/50")}>
      <div className="container grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            eyebrow="FAQ"
            title="Questions, answered"
            highlight="answered"
            description="Still unsure? Our advisors reply within one working day."
            align="left"
            action={
              <Link href="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700">
                Ask a question <ArrowUpRight size={15} />
              </Link>
            }
          />
        </div>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-2xl border border-line bg-white shadow-soft transition-shadow open:shadow-lift">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 p-6 text-left text-[17px] font-semibold text-ink-900 [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-ink-500 transition-all duration-300 group-open:rotate-45 group-open:border-primary-200 group-open:bg-primary-50 group-open:text-primary-600">
                  <Plus size={16} />
                </span>
              </summary>
              <p className="-mt-1 px-6 pb-6 text-[15px] leading-7 text-ink-500">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TopicRelated({ related }: { related: TopicContent[] }) {
  if (related.length === 0) return null;
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <SectionHeader eyebrow="Keep going" title="Related topics" align="left" />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {related.map((topic) => (
            <Link
              key={topic.slug}
              href={`/${topic.slug}`}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-lift"
            >
              <div>
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-primary-600">{topic.eyebrow}</span>
                <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-ink-900">{topic.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-500">{topic.summary}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-ink-900">
                Read more
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

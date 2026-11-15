import Link from "next/link";
import { ArrowUpRight, Check, FileText, Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import { Chip, IconBadge, SectionHeader } from "@/components/ui/marketing-primitives";
import { Motion, Stagger } from "@/components/ui/motion/Motion";
import type { TopicContent } from "@/content/topics";
import { TopicArt, artSceneFor } from "@/components/illustrations/TopicArt";
import { CodeWindow } from "./CodeWindow";
import type { TopicLook } from "./look";
import { topicIconMap } from "./topic-icons";

/*
 * Section contents. None of these draws its own background or padding: a page lays them out as coloured bands with
 * `SectionFlow`, which also supplies the dividers and the background pattern. The pictures in the sections are all
 * different scenes (`artSceneFor`), none of them the banner's.
 */

/** The `step`-th picture down a page: another scene in the page's colours, with one of the page's concept icons. */
export function SectionArt({ topic, step, tone = "light", className }: { topic: TopicContent; step: number; tone?: "light" | "dark"; className?: string }) {
  const concept = topic.concepts[step % topic.concepts.length];
  return <TopicArt seed={topic.slug} scene={artSceneFor(topic.slug, step)} tone={tone} icon={topicIconMap[concept.icon]} className={className} />;
}

export function TopicOverview({ topic, look }: { topic: TopicContent; look: TopicLook }) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <div className={cn(look.flip && "lg:order-2")}>
        <SectionHeader eyebrow="Overview" title={topic.overview.heading} align="left" />
        <Stagger className="mt-8 space-y-6">
          {topic.overview.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="text-lg leading-8 text-ink-600 first:text-xl first:leading-9 first:text-ink-800">
              {paragraph}
            </p>
          ))}
        </Stagger>
        {topic.tools && topic.tools.length > 0 && (
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">Tools you will use</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {topic.tools.map((tool) => (
                <Chip key={tool}>{tool}</Chip>
              ))}
            </div>
          </div>
        )}
      </div>
      <Motion className={cn(look.flip && "lg:order-1")}>
        <SectionArt topic={topic} step={1} />
      </Motion>
    </div>
  );
}

/** What the page covers, laid out one of four ways depending on the page. Always sits on a tinted or white band. */
export function TopicConcepts({ topic, look, heading = "What you need to master", highlight = "master", eyebrow = "Key concepts" }: { topic: TopicContent; look: TopicLook; heading?: string; highlight?: string; eyebrow?: string }) {
  const header = <SectionHeader eyebrow={eyebrow} title={heading} highlight={highlight} align={look.list === "cards" || look.list === "centered" ? "center" : "left"} />;

  if (look.list === "zigzag") {
    return (
      <>
        {header}
        <ol className="mt-14 space-y-4">
          {topic.concepts.map((concept, index) => {
            const even = index % 2 === 0;
            return (
              <Motion as="li" key={concept.title} delay={index * 60}>
                <article className={cn("grid items-center gap-6 rounded-md border border-line p-7 md:grid-cols-[8rem_1fr] md:gap-10 md:p-9", even ? "bg-white" : "bg-primary-100/70 md:grid-cols-[1fr_8rem] md:text-right")}>
                  <span className={cn("font-display text-7xl leading-none text-primary-300 md:text-8xl", !even && "md:order-2")}>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className={cn("flex items-center gap-3 text-2xl font-semibold tracking-tight text-ink-900", !even && "md:justify-end")}>
                      <IconBadge icon={topicIconMap[concept.icon]} variant="brand" />
                      {concept.title}
                    </h3>
                    <p className={cn("mt-3 max-w-2xl leading-7 text-ink-600", !even && "md:ml-auto")}>{concept.description}</p>
                  </div>
                </article>
              </Motion>
            );
          })}
        </ol>
      </>
    );
  }

  if (look.list === "banded") {
    const accents = ["border-l-primary-500", "border-l-accent-400", "border-l-primary-300", "border-l-ink-800"];
    return (
      <>
        {header}
        <ol className="mt-14 overflow-hidden rounded-md border border-line">
          {topic.concepts.map((concept, index) => {
            const Icon = topicIconMap[concept.icon];
            return (
              <li key={concept.title} className={cn("grid gap-4 border-l-4 p-6 sm:grid-cols-[4rem_1fr_3rem] sm:items-center sm:gap-8 sm:p-8", accents[index % accents.length], index % 2 === 0 ? "bg-white" : "bg-primary-100/60", index > 0 && "border-t border-t-line")}>
                <span className="font-mono text-2xl font-semibold text-primary-500">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-xl font-semibold text-ink-900">{concept.title}</h3>
                  <p className="mt-1.5 leading-7 text-ink-600">{concept.description}</p>
                </div>
                <Icon size={26} className="hidden text-primary-500 sm:block sm:justify-self-end" aria-hidden />
              </li>
            );
          })}
        </ol>
      </>
    );
  }

  if (look.list === "centered") {
    return (
      <>
        {header}
        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" itemClassName="h-full">
          {topic.concepts.map((concept, index) => {
            const solid = index % 3 === 1;
            return (
              <article key={concept.title} className={cn("flex h-full flex-col items-center rounded-md border p-8 text-center", solid ? "border-primary-700 bg-primary-700 text-white" : "border-line bg-white shadow-soft")}>
                <IconBadge icon={topicIconMap[concept.icon]} variant={solid ? "dark" : "brand"} />
                <span className={cn("mt-5 font-mono text-xs", solid ? "text-primary-200" : "text-ink-400")}>{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">{concept.title}</h3>
                <p className={cn("mt-3 text-[15px] leading-7", solid ? "text-primary-100" : "text-ink-500")}>{concept.description}</p>
              </article>
            );
          })}
        </Stagger>
      </>
    );
  }

  return (
    <>
      {header}
      <Stagger className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3" itemClassName="h-full">
        {topic.concepts.map((concept, index) => (
          <article key={concept.title} className="group relative h-full overflow-hidden rounded-md border border-line bg-white p-7 shadow-soft ui-card-link">
            <div className="flex items-start justify-between">
              <IconBadge icon={topicIconMap[concept.icon]} variant="brand" />
              <span className="font-mono text-xs text-ink-300">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-6 text-xl font-semibold tracking-tight text-ink-900">{concept.title}</h3>
            <p className="mt-2.5 text-[15px] leading-7 text-ink-500">{concept.description}</p>
          </article>
        ))}
      </Stagger>
    </>
  );
}

/** What you will be able to do: a two-column checklist beside a picture. Sits on a dark or brand band. */
export function TopicOutcomes({ topic, look }: { topic: TopicContent; look: TopicLook }) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
      <Motion className={cn(look.flip && "lg:order-2")}>
        <SectionArt topic={topic} step={2} tone="dark" />
      </Motion>
      <div className={cn(look.flip && "lg:order-1")}>
        <SectionHeader eyebrow="Outcomes" title="By the end you will be able to" highlight="able" align="left" tone="dark" />
        <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {topic.outcomes.map((outcome) => (
            <li key={outcome} className="flex gap-3 text-[15px] leading-7 text-primary-50">
              <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-white/15 ring-1 ring-white/25">
                <Check size={12} strokeWidth={3} />
              </span>
              {outcome}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function TopicSteps({ topic, steps, look }: { topic: TopicContent; steps: NonNullable<TopicContent["steps"]>; look: TopicLook }) {
  if (look.steps === "alternating") {
    return (
      <>
        <SectionHeader eyebrow="How it works" title="Step by step" highlight="step" description="The sequence practising BAs follow — each step builds on the evidence from the last." />
        <ol className="relative mx-auto mt-14 max-w-4xl">
          <div aria-hidden className="absolute bottom-0 left-6 top-0 w-px bg-gradient-to-b from-primary-400 via-primary-200 to-transparent md:left-1/2" />
          {steps.map((step, index) => {
            const left = index % 2 === 0;
            return (
              <Motion as="li" key={step.title} delay={index * 80} className="relative pb-10 pl-16 last:pb-0 md:grid md:grid-cols-2 md:gap-16 md:pl-0">
                <span className="absolute left-0 top-0 z-10 grid h-12 w-12 place-items-center rounded-md border border-primary-200 bg-white font-mono text-sm font-semibold text-primary-600 shadow-soft md:left-1/2 md:-translate-x-1/2">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className={cn("pt-2", left ? "md:col-start-1 md:text-right" : "md:col-start-2 md:text-left")}>
                  <h3 className="text-xl font-semibold tracking-tight text-ink-900">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-7 text-ink-500">{step.description}</p>
                </div>
              </Motion>
            );
          })}
        </ol>
      </>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <SectionHeader eyebrow="How it works" title="Step by step" highlight="step" description="The sequence practising BAs follow — each step builds on the evidence from the last." align="left" />
        <SectionArt topic={topic} step={3} className="mt-10 max-w-sm" />
      </div>
      <ol className="relative">
        <div aria-hidden className="absolute bottom-6 left-[23px] top-6 w-px bg-gradient-to-b from-primary-400 via-primary-200 to-transparent" />
        {steps.map((step, index) => (
          <Motion as="li" key={step.title} delay={index * 80} className="relative flex gap-6 pb-10 last:pb-0">
            <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-md border border-primary-200 bg-white font-mono text-sm font-semibold text-primary-600 shadow-soft">
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
  );
}

export function TopicExample({ example, tone = "light" }: { example: NonNullable<TopicContent["example"]>; tone?: "light" | "dark" }) {
  return (
    <>
      <SectionHeader eyebrow="Worked example" title={example.title} tone={tone} />
      <Motion className="mx-auto mt-12 max-w-4xl">
        <CodeWindow {...example} title={example.language === "text" ? "Example" : example.language.toUpperCase()} />
      </Motion>
    </>
  );
}

/** Deliverables on a dark band: a grid of cards, or rows with the name on one side and the description on the other, depending on the page. */
export function TopicArtifacts({ topic, artifacts, look }: { topic: TopicContent; artifacts: NonNullable<TopicContent["artifacts"]>; look: TopicLook }) {
  const header = (
    <SectionHeader
      eyebrow="Deliverables"
      title="What you will produce"
      highlight="produce"
      description="Tangible artifacts reviewed against the standard a lead BA would expect on a live project."
      tone="dark"
      align="left"
    />
  );

  if (look.list === "zigzag" || look.list === "banded") {
    return (
      <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          {header}
          <SectionArt topic={topic} step={1} tone="dark" className="mt-10 max-w-sm" />
        </div>
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {artifacts.map((artifact, index) => (
            <li key={artifact.name} className={cn("grid gap-3 py-7 sm:grid-cols-[1fr_1.4fr] sm:gap-8", index % 2 === 1 && "sm:text-right")}>
              <h3 className={cn("flex items-center gap-3 text-lg font-semibold", index % 2 === 1 && "sm:order-2 sm:flex-row-reverse")}>
                <FileText size={18} className="text-accent-300" aria-hidden />
                {artifact.name}
              </h3>
              <p className="text-[15px] leading-7 text-ink-300">{artifact.description}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <>
      <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
        {header}
        <SectionArt topic={topic} step={1} tone="dark" className="hidden max-w-xs justify-self-end lg:block" />
      </div>
      <Stagger className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3" itemClassName="h-full">
        {artifacts.map((artifact, index) => (
          <article key={artifact.name} className={cn("group h-full rounded-md border p-7", index === 0 ? "border-white/25 bg-white/[0.09]" : "border-white/10 bg-white/[0.03]", "ui-row-inverse")}>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-gradient-to-br from-primary-400/30 to-accent-400/10 text-accent-200 ring-1 ring-white/10">
                <FileText size={18} strokeWidth={1.75} />
              </span>
              <h3 className="text-lg font-semibold tracking-tight">{artifact.name}</h3>
            </div>
            <p className="mt-4 text-[15px] leading-7 text-ink-300">{artifact.description}</p>
          </article>
        ))}
      </Stagger>
    </>
  );
}

/** The A–Z list: terms grouped under a large letter with a rule, so each letter reads as its own block. */
export function TopicTerms({ terms }: { terms: NonNullable<TopicContent["terms"]> }) {
  const sorted = [...terms].sort((a, b) => a.term.localeCompare(b.term));
  const groups = new Map<string, typeof sorted>();
  for (const item of sorted) {
    const letter = item.term[0].toUpperCase();
    groups.set(letter, [...(groups.get(letter) ?? []), item]);
  }

  return (
    <>
      <SectionHeader eyebrow="A–Z" title="The working vocabulary of a BA" highlight="vocabulary" />
      <nav aria-label="Glossary letters" className="sticky top-20 z-10 mx-auto mt-10 flex max-w-max flex-wrap justify-center gap-1 rounded-md border border-line bg-white/90 p-1.5 shadow-soft backdrop-blur">
        {[...groups.keys()].map((letter) => (
          <a key={letter} href={`#letter-${letter}`} className="grid h-8 w-8 place-items-center rounded-md text-sm font-semibold text-ink-600 ui-row">
            {letter}
          </a>
        ))}
      </nav>
      <div className="mx-auto mt-12 max-w-5xl space-y-12">
        {[...groups.entries()].map(([letter, items], groupIndex) => (
          <section key={letter} id={`letter-${letter}`} className="scroll-mt-36">
            <div className="flex items-center gap-5">
              <span className={cn("grid h-14 w-14 place-items-center rounded-md font-display text-3xl", groupIndex % 2 ? "bg-primary-700 text-white" : "bg-white text-primary-600 ring-1 ring-primary-200")}>{letter}</span>
              <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-primary-300 to-transparent" />
            </div>
            <dl className="mt-6 grid gap-4 md:grid-cols-2">
              {items.map((item) => (
                <div key={item.term} className="rounded-md border border-line bg-white p-6 ui-card-link">
                  <dt className="text-lg font-semibold text-ink-900">{item.term}</dt>
                  <dd className="mt-2.5 text-[15px] leading-7 text-ink-500">{item.definition}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </>
  );
}

/** `topic` adds that page's picture beside the heading; the contact and home pages use the list without one. `large` is accepted for those callers, which render it on their own band. */
export function TopicFaq({ topic, faqs, large = false }: { topic?: TopicContent; faqs: TopicContent["faqs"]; large?: boolean }) {
  const list = (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <SectionHeader
          eyebrow="FAQ"
          title="Questions, answered"
          highlight="answered"
          description="Still unsure? Our advisors reply within one working day."
          align="left"
          action={
            <Link href="/contact" className="inline-flex min-h-6 items-center gap-1.5 text-sm font-semibold ui-link">
              Ask a question <ArrowUpRight size={15} />
            </Link>
          }
        />
        {topic && <SectionArt topic={topic} step={3} className="mt-10 hidden max-w-xs lg:block" />}
      </div>
      <div className="space-y-3">
        {faqs.map((faq) => (
          <details key={faq.question} className="group rounded-md border border-line bg-white shadow-soft transition-shadow open:shadow-lift">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 p-6 text-left text-[17px] font-semibold text-ink-900 [&::-webkit-details-marker]:hidden">
              {faq.question}
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-line text-ink-500 transition-all duration-300 group-open:rotate-45 group-open:border-primary-200 group-open:bg-primary-50 group-open:text-primary-600">
                <Plus size={16} />
              </span>
            </summary>
            <p className="-mt-1 px-6 pb-6 text-[15px] leading-7 text-ink-500">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
  if (topic) return list;
  return (
    <section className={cn("py-20 md:py-28", !large && "border-t border-line bg-ink-50/50")}>
      <div className="container">{list}</div>
    </section>
  );
}

/** Related pages, each card topped with that page's own artwork. */
export function TopicRelated({ related }: { related: TopicContent[] }) {
  if (related.length === 0) return null;
  return (
    <>
      <SectionHeader eyebrow="Keep going" title="Related topics" align="left" />
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {related.map((topic) => (
          <Link key={topic.slug} href={`/${topic.slug}`} className="group relative flex flex-col overflow-hidden rounded-md border border-line bg-white ui-card-link">
            <TopicArt seed={topic.slug} flush className="aspect-[16/9] border-b border-line" />
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-primary-600">{topic.eyebrow}</span>
                <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-ink-900">{topic.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-500">{topic.summary}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-ink-900">
                Read more
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

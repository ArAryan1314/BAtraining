import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, SectionHeader } from "@/components/ui/marketing-primitives";
import { CtaBand } from "@/components/sections/marketing/CtaBand";
import { getRelatedTopics, type TopicContent } from "@/content/topics";
import { TopicExample, TopicFaq, TopicRelated, TopicSteps, TopicTerms } from "../TopicSections";

/** Career page: an editorial, story-led layout. Large serif headline, a numbered outcome roadmap, and deliverables as a bento grid. */
export function CareerLayout({ topic }: { topic: TopicContent }) {
  const [lead, ...rest] = topic.artifacts ?? [];

  return (
    <>
      <header className="bg-[#fbf8f3] pb-20 pt-36 md:pb-28 md:pt-44">
        <div className="container max-w-5xl text-center">
          <Eyebrow>{topic.eyebrow}</Eyebrow>
          <h1 className="mt-6 font-display text-5xl font-normal leading-[1.02] tracking-tight text-ink-900 sm:text-7xl">{topic.title}</h1>
          <p className="mx-auto mt-8 max-w-2xl text-xl leading-9 text-ink-600">{topic.summary}</p>
          <div className="mt-10 flex justify-center"><ButtonLink href="/contact" size="lg">Talk to an advisor <ArrowRight size={16} /></ButtonLink></div>
          <dl className="mx-auto mt-14 flex max-w-3xl flex-wrap justify-center gap-x-12 gap-y-6 border-t border-ink-200 pt-8">
            {topic.meta.map((item) => (
              <div key={item.label}>
                <dt className="text-xs font-medium uppercase tracking-[0.14em] text-ink-500">{item.label}</dt>
                <dd className="mt-1 text-lg font-semibold text-ink-900">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <section className="py-20 md:py-28">
        <div className="container max-w-4xl">
          <h2 className="font-display text-4xl text-ink-900 md:text-5xl">{topic.overview.heading}</h2>
          <div className="mt-8 columns-1 gap-12 space-y-5 text-lg leading-8 text-ink-600 md:columns-2 md:space-y-0 [&>p]:mb-5 [&>p]:break-inside-avoid">
            {topic.overview.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 32)}>{paragraph}</p>)}
          </div>
        </div>
      </section>

      {topic.terms && topic.terms.length > 0 && <TopicTerms terms={topic.terms} />}

      <section className="border-y border-line bg-ink-50/60 py-20 md:py-28">
        <div className="container max-w-5xl">
          <SectionHeader eyebrow="Your roadmap" title="Where this takes you" highlight="takes you" align="left" />
          <ol className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {topic.outcomes.map((outcome, index) => (
              <li key={outcome} className="flex gap-5">
                <span className="font-display text-5xl leading-none text-primary-300">{index + 1}</span>
                <p className="pt-1 text-lg leading-8 text-ink-800">{outcome}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container max-w-6xl">
          <SectionHeader eyebrow="Focus areas" title="What to get right" highlight="get right" align="left" />
          <div className="mt-12 space-y-0 divide-y divide-line border-y border-line">
            {topic.concepts.map((concept) => (
              <article key={concept.title} className="grid gap-3 py-8 md:grid-cols-[1fr_1.6fr] md:gap-12">
                <h3 className="text-2xl font-semibold tracking-tight text-ink-900">{concept.title}</h3>
                <p className="leading-8 text-ink-500">{concept.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {lead && (
        <section className="bg-ink-950 py-20 text-white md:py-28">
          <div className="container max-w-6xl">
            <SectionHeader eyebrow="Proof of work" title="What you will have to show" highlight="show" tone="dark" align="left" />
            <div className="mt-12 grid gap-4 md:grid-cols-3 md:grid-rows-2">
              <article className="rounded-md bg-gradient-to-br from-primary-600 to-accent-500 p-8 md:col-span-2 md:row-span-2">
                <h3 className="font-display text-4xl">{lead.name}</h3>
                <p className="mt-4 max-w-md text-lg leading-8 text-white/85">{lead.description}</p>
              </article>
              {rest.slice(0, 2).map((artifact) => (
                <article key={artifact.name} className="rounded-md border border-white/10 bg-white/[0.04] p-6">
                  <h3 className="text-lg font-semibold">{artifact.name}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-ink-400">{artifact.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {topic.steps && topic.steps.length > 0 && <TopicSteps steps={topic.steps} />}
      {topic.example && <TopicExample example={topic.example} />}
      <TopicFaq faqs={topic.faqs} />
      <TopicRelated related={getRelatedTopics(topic)} />
      <CtaBand />
    </>
  );
}

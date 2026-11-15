import { cn } from "@/lib/cn";
import { SectionHeader } from "@/components/ui/marketing-primitives";
import { CtaBand } from "@/components/sections/marketing/CtaBand";
import { getRelatedTopics, type TopicContent } from "@/content/topics";
import type { TopicLook } from "../look";
import { SectionFlow, type FlowItem } from "../SectionFlow";
import { TopicHero } from "../TopicHero";
import { SectionArt, TopicExample, TopicFaq, TopicRelated, TopicSteps, TopicTerms } from "../TopicSections";

/** Career page: an editorial overview with a picture, a numbered roadmap, rows that alternate shade, and deliverables as a bento grid. */
export function CareerLayout({ topic, look }: { topic: TopicContent; look: TopicLook }) {
  const [lead, ...rest] = topic.artifacts ?? [];

  const items: FlowItem[] = [
    {
      key: "overview",
      tone: "white",
      node: (
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-4xl text-ink-900 md:text-5xl">{topic.overview.heading}</h2>
          <div className="mt-10 grid items-start gap-10 md:grid-cols-[1fr_1.2fr] md:gap-14">
            <SectionArt topic={topic} step={1} className={cn(look.flip && "md:order-2")} />
            <div className="space-y-5 text-lg leading-8 text-ink-600">
              {topic.overview.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 32)}>{paragraph}</p>)}
            </div>
          </div>
        </div>
      ),
    },
  ];
  if (topic.terms?.length) items.push({ key: "terms", tone: "soft", node: <TopicTerms terms={topic.terms} /> });
  items.push({
    key: "roadmap",
    tone: "tint",
    narrow: true,
    node: (
      <>
        <SectionHeader eyebrow="Your roadmap" title="Where this takes you" highlight="takes you" align="left" />
        <ol className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {topic.outcomes.map((outcome, index) => (
            <li key={outcome} className={cn("flex gap-5", index % 2 === 1 && "md:flex-row-reverse md:text-right")}>
              <span className="font-display text-6xl leading-none text-primary-300">{index + 1}</span>
              <p className="pt-1 text-lg leading-8 text-ink-800">{outcome}</p>
            </li>
          ))}
        </ol>
      </>
    ),
  });
  items.push({
    key: "focus",
    tone: "white",
    node: (
      <>
        <SectionHeader eyebrow="Focus areas" title="What to get right" highlight="get right" align="left" />
        <div className="mt-12 overflow-hidden rounded-md border border-line">
          {topic.concepts.map((concept, index) => (
            <article key={concept.title} className={cn("grid gap-3 p-7 md:grid-cols-[1fr_1.6fr] md:gap-12 md:p-9", index % 2 === 0 ? "bg-white" : "bg-primary-50", index > 0 && "border-t border-line")}>
              <h3 className={cn("text-2xl font-semibold tracking-tight text-ink-900", look.flip && "md:order-2 md:text-right")}>{concept.title}</h3>
              <p className="leading-8 text-ink-600">{concept.description}</p>
            </article>
          ))}
        </div>
      </>
    ),
  });
  if (lead) {
    items.push({
      key: "proof",
      tone: "dark",
      node: (
        <>
          <SectionHeader eyebrow="Proof of work" title="What you will have to show" highlight="show" tone="dark" align="left" />
          <div className="mt-12 grid gap-4 md:grid-cols-3 md:grid-rows-2">
            <article className="relative overflow-hidden rounded-md bg-gradient-to-br from-primary-600 to-accent-500 p-8 md:col-span-2 md:row-span-2">
              <h3 className="font-display text-4xl">{lead.name}</h3>
              <p className="mt-4 max-w-md text-lg leading-8 text-white/85">{lead.description}</p>
              <SectionArt topic={topic} step={2} tone="dark" className="mt-8 max-w-xs" />
            </article>
            {rest.slice(0, 2).map((artifact) => (
              <article key={artifact.name} className="rounded-md border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-lg font-semibold">{artifact.name}</h3>
                <p className="mt-3 text-[15px] leading-7 text-ink-300">{artifact.description}</p>
              </article>
            ))}
          </div>
        </>
      ),
    });
  }
  if (topic.steps?.length) items.push({ key: "steps", tone: "white", node: <TopicSteps topic={topic} steps={topic.steps} look={look} /> });
  if (topic.example) items.push({ key: "example", tone: "soft", narrow: true, node: <TopicExample example={topic.example} /> });
  items.push({ key: "faq", tone: "tint", node: <TopicFaq topic={topic} faqs={topic.faqs} /> });
  items.push({ key: "related", tone: "white", node: <TopicRelated related={getRelatedTopics(topic)} /> });

  return (
    <>
      <TopicHero topic={topic} visual="art" />
      <SectionFlow items={items} shape={look.divider} pattern={look.pattern} />
      <CtaBand />
    </>
  );
}

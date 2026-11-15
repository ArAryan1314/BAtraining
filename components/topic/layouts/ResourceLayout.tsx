import Link from "next/link";
import { cn } from "@/lib/cn";
import { CtaBand } from "@/components/sections/marketing/CtaBand";
import { Chip } from "@/components/ui/marketing-primitives";
import { getRelatedTopics, type TopicContent } from "@/content/topics";
import type { TopicLook } from "../look";
import { SectionFlow, type FlowItem } from "../SectionFlow";
import { TopicHero } from "../TopicHero";
import { SectionArt, TopicExample, TopicFaq, TopicRelated, TopicSteps, TopicTerms } from "../TopicSections";

/** Resource page: a jump bar, then dense reference content, with the definitions shaded row by row. */
export function ResourceLayout({ topic, look }: { topic: TopicContent; look: TopicLook }) {
  const jumps = [
    { id: "summary", label: "Summary" },
    topic.terms?.length ? { id: "glossary", label: "Glossary" } : null,
    { id: "reference", label: "Reference" },
    topic.example ? { id: "example", label: "Example" } : null,
    { id: "faq", label: "FAQ" },
  ].filter((jump) => jump !== null);

  const items: FlowItem[] = [
    {
      key: "summary",
      id: "summary",
      tone: "white",
      node: (
        <div className="grid items-start gap-10 md:grid-cols-[1.6fr_1fr]">
          <div className={cn("space-y-5 text-lg leading-8 text-ink-600", look.flip && "md:order-2")}>
            <h2 className="text-3xl font-semibold tracking-tight text-ink-900">{topic.overview.heading}</h2>
            {topic.overview.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 32)}>{paragraph}</p>)}
          </div>
          <aside className={cn("space-y-5", look.flip && "md:order-1")}>
            <SectionArt topic={topic} step={1} />
            {topic.tools && topic.tools.length > 0 && (
              <div className="rounded-md border border-line bg-primary-50 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">Tools you will use</p>
                <div className="mt-4 flex flex-wrap gap-2">{topic.tools.map((tool) => <Chip key={tool}>{tool}</Chip>)}</div>
              </div>
            )}
          </aside>
        </div>
      ),
    },
  ];
  if (topic.terms?.length) items.push({ key: "glossary", id: "glossary", tone: "soft", node: <TopicTerms terms={topic.terms} /> });
  items.push({
    key: "reference",
    id: "reference",
    tone: "tint",
    narrow: true,
    node: (
      <>
        <h2 className="text-3xl font-semibold tracking-tight text-ink-900">Reference</h2>
        <dl className="mt-8 overflow-hidden rounded-md border border-line">
          {topic.concepts.map((concept, index) => (
            <div key={concept.title} className={cn("grid gap-2 p-6 md:grid-cols-[14rem_1fr] md:gap-8", index % 2 === 0 ? "bg-white" : "bg-primary-100/60", index > 0 && "border-t border-line")}>
              <dt className="font-semibold text-ink-900">{concept.title}</dt>
              <dd className="leading-7 text-ink-600">{concept.description}</dd>
            </div>
          ))}
        </dl>
        {topic.artifacts && topic.artifacts.length > 0 && (
          <>
            <h3 className="mt-14 text-xl font-semibold tracking-tight text-ink-900">Templates and artifacts</h3>
            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {topic.artifacts.map((artifact) => (
                <li key={artifact.name} className="rounded-md border border-dashed border-primary-300 bg-white p-5">
                  <p className="font-semibold text-ink-900">{artifact.name}</p>
                  <p className="mt-1 text-sm leading-6 text-ink-500">{artifact.description}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </>
    ),
  });
  if (topic.steps?.length) items.push({ key: "steps", tone: "white", node: <TopicSteps topic={topic} steps={topic.steps} look={look} /> });
  if (topic.example) items.push({ key: "example", id: "example", tone: "dark", narrow: true, node: <TopicExample example={topic.example} tone="dark" /> });
  items.push({ key: "faq", id: "faq", tone: "soft", node: <TopicFaq topic={topic} faqs={topic.faqs} /> });
  items.push({ key: "related", tone: "white", node: <TopicRelated related={getRelatedTopics(topic)} /> });

  return (
    <>
      <TopicHero topic={topic} visual="art" />
      <nav aria-label="Jump to section" className="border-b border-line bg-ink-50">
        <div className="container flex max-w-5xl flex-wrap gap-2 py-4">
          {jumps.map((jump) => <a key={jump.id} href={`#${jump.id}`} className="rounded-md border border-line bg-white px-4 py-1.5 text-sm font-medium text-ink-700 ui-row">{jump.label}</a>)}
        </div>
      </nav>
      <main>
        <SectionFlow items={items} shape={look.divider} pattern={look.pattern} from="soft" />
      </main>
      <p className="container py-10 text-center text-sm text-ink-500">Need something specific? <Link href="/contact" className="font-semibold text-primary-600">Ask an advisor</Link>.</p>
      <CtaBand />
    </>
  );
}

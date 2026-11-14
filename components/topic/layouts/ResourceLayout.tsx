import Link from "next/link";
import { CtaBand } from "@/components/sections/marketing/CtaBand";
import { Chip } from "@/components/ui/marketing-primitives";
import { getRelatedTopics, type TopicContent } from "@/content/topics";
import { TopicHero } from "../TopicHero";
import { TopicExample, TopicFaq, TopicRelated, TopicSteps, TopicTerms } from "../TopicSections";

/** Resource page: the shared banner, a jump bar, then dense definition-style content. */
export function ResourceLayout({ topic }: { topic: TopicContent }) {
  const jumps = [
    { id: "summary", label: "Summary" },
    topic.terms?.length ? { id: "glossary", label: "Glossary" } : null,
    { id: "reference", label: "Reference" },
    topic.example ? { id: "example", label: "Example" } : null,
    { id: "faq", label: "FAQ" },
  ].filter((jump) => jump !== null);

  const hasTools = Boolean(topic.tools?.length);

  return (
    <>
      <TopicHero topic={topic} visual="art" />

      <nav aria-label="Jump to section" className="border-b border-line bg-ink-50">
        <div className="container flex max-w-5xl flex-wrap gap-2 py-4">
          {jumps.map((jump) => <a key={jump.id} href={`#${jump.id}`} className="rounded-md border border-line bg-white px-4 py-1.5 text-sm font-medium text-ink-700 ui-row">{jump.label}</a>)}
        </div>
      </nav>

      <main>
        <section id="summary" className="scroll-mt-24 py-14 md:py-20">
          <div className={hasTools ? "container grid max-w-5xl gap-10 md:grid-cols-[1.6fr_1fr]" : "container max-w-3xl"}>
            <div className="space-y-5 text-lg leading-8 text-ink-600">
              <h2 className="text-2xl font-semibold tracking-tight text-ink-900">{topic.overview.heading}</h2>
              {topic.overview.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 32)}>{paragraph}</p>)}
            </div>
            {hasTools && (
              <aside className="self-start rounded-md border border-line bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">Tools you will use</p>
                <div className="mt-4 flex flex-wrap gap-2">{topic.tools?.map((tool) => <Chip key={tool}>{tool}</Chip>)}</div>
              </aside>
            )}
          </div>
        </section>

        {topic.terms && topic.terms.length > 0 && <div id="glossary" className="scroll-mt-24"><TopicTerms terms={topic.terms} /></div>}

        <section id="reference" className="scroll-mt-24 border-t border-line py-14 md:py-20">
          <div className="container max-w-5xl">
            <h2 className="text-2xl font-semibold tracking-tight text-ink-900">Reference</h2>
            <dl className="mt-8 divide-y divide-line rounded-md border border-line bg-white">
              {topic.concepts.map((concept) => (
                <div key={concept.title} className="grid gap-2 p-5 md:grid-cols-[14rem_1fr] md:gap-8">
                  <dt className="font-semibold text-ink-900">{concept.title}</dt>
                  <dd className="leading-7 text-ink-500">{concept.description}</dd>
                </div>
              ))}
            </dl>
            {topic.artifacts && topic.artifacts.length > 0 && (
              <>
                <h3 className="mt-14 text-xl font-semibold tracking-tight text-ink-900">Templates and artifacts</h3>
                <ul className="mt-5 grid gap-3 md:grid-cols-2">
                  {topic.artifacts.map((artifact) => (
                    <li key={artifact.name} className="rounded-md border border-dashed border-ink-300 p-5">
                      <p className="font-semibold text-ink-900">{artifact.name}</p>
                      <p className="mt-1 text-sm leading-6 text-ink-500">{artifact.description}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </section>

        {topic.steps && topic.steps.length > 0 && <TopicSteps steps={topic.steps} />}
        {topic.example && <div id="example" className="scroll-mt-24"><TopicExample example={topic.example} /></div>}
        <div id="faq" className="scroll-mt-24"><TopicFaq faqs={topic.faqs} large={topic.slug === "faq"} /></div>
        <TopicRelated related={getRelatedTopics(topic)} />
      </main>
      <p className="container pb-10 text-center text-sm text-ink-500">Need something specific? <Link href="/contact" className="font-semibold text-primary-600">Ask an advisor</Link>.</p>
      <CtaBand />
    </>
  );
}

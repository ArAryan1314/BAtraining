import Link from "next/link";
import { CtaBand } from "@/components/sections/marketing/CtaBand";
import { Chip } from "@/components/ui/marketing-primitives";
import { getRelatedTopics, type TopicContent } from "@/content/topics";
import { TopicExample, TopicFaq, TopicRelated, TopicSteps, TopicTerms } from "../TopicSections";

/** Resource page: a compact reference sheet. Short header, a jump bar, then dense definition-style content. */
export function ResourceLayout({ topic }: { topic: TopicContent }) {
  const jumps = [
    { id: "summary", label: "Summary" },
    topic.terms?.length ? { id: "glossary", label: "Glossary" } : null,
    { id: "reference", label: "Reference" },
    topic.example ? { id: "example", label: "Example" } : null,
    { id: "faq", label: "FAQ" },
  ].filter((jump) => jump !== null);

  return (
    <>
      <header className="border-b border-line bg-ink-50 pb-10 pt-28 md:pt-32">
        <div className="container max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary-600">{topic.eyebrow}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink-900 sm:text-5xl">{topic.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-ink-600">{topic.summary}</p>
        </div>
        <nav aria-label="Jump to section" className="container mt-8 flex max-w-5xl flex-wrap gap-2">
          {jumps.map((jump) => <a key={jump.id} href={`#${jump.id}`} className="rounded-full border border-line bg-white px-4 py-1.5 text-sm font-medium text-ink-700 hover:border-primary-300 hover:text-primary-700">{jump.label}</a>)}
        </nav>
      </header>

      <main>
        <section id="summary" className="scroll-mt-24 py-14 md:py-20">
          <div className="container grid max-w-5xl gap-10 md:grid-cols-[1.6fr_1fr]">
            <div className="space-y-5 text-lg leading-8 text-ink-600">
              <h2 className="text-2xl font-semibold tracking-tight text-ink-900">{topic.overview.heading}</h2>
              {topic.overview.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 32)}>{paragraph}</p>)}
            </div>
            <aside className="space-y-6 self-start rounded-2xl border border-line bg-white p-6">
              <dl className="space-y-4">
                {topic.meta.map((item) => (
                  <div key={item.label}>
                    <dt className="text-xs font-medium uppercase tracking-[0.12em] text-ink-500">{item.label}</dt>
                    <dd className="font-semibold text-ink-900">{item.value}</dd>
                  </div>
                ))}
              </dl>
              {topic.tools && topic.tools.length > 0 && <div className="flex flex-wrap gap-2 border-t border-line pt-5">{topic.tools.map((tool) => <Chip key={tool}>{tool}</Chip>)}</div>}
            </aside>
          </div>
        </section>

        {topic.terms && topic.terms.length > 0 && <div id="glossary" className="scroll-mt-24"><TopicTerms terms={topic.terms} /></div>}

        <section id="reference" className="scroll-mt-24 border-t border-line py-14 md:py-20">
          <div className="container max-w-5xl">
            <h2 className="text-2xl font-semibold tracking-tight text-ink-900">Reference</h2>
            <dl className="mt-8 divide-y divide-line rounded-2xl border border-line bg-white">
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
                    <li key={artifact.name} className="rounded-xl border border-dashed border-ink-300 p-5">
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

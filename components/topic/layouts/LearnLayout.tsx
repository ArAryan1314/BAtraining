import { CtaBand } from "@/components/sections/marketing/CtaBand";
import { getRelatedTopics, type TopicContent } from "@/content/topics";
import { TopicHero } from "../TopicHero";
import { TopicArtifacts, TopicExample, TopicFaq, TopicRelated, TopicSteps } from "../TopicSections";
import { topicIconMap } from "../topic-icons";

/** Learning track: the shared banner, then a docs-style page with a pinned contents rail beside the curriculum. */
export function LearnLayout({ topic }: { topic: TopicContent }) {
  const sections = [
    { id: "overview", label: "Overview", show: true },
    { id: "concepts", label: "Modules", show: true },
    { id: "outcomes", label: "Outcomes", show: true },
  ];

  return (
    <>
      <TopicHero topic={topic} visual="art" />

      <div className="container grid max-w-6xl gap-12 py-16 lg:grid-cols-[16rem_1fr] lg:gap-16 lg:py-24">
        <aside className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
          <nav aria-label="On this page">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">On this page</p>
            <ul className="mt-3 space-y-2 border-l border-line text-sm">
              {sections.map((section) => (
                <li key={section.id}><a href={`#${section.id}`} className="-ml-px block border-l border-transparent pl-4 text-ink-600 ui-row">{section.label}</a></li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="min-w-0 space-y-20">
          <section id="overview" className="scroll-mt-28">
            <h2 className="text-3xl font-semibold tracking-tight text-ink-900">{topic.overview.heading}</h2>
            <div className="mt-6 space-y-5 text-lg leading-8 text-ink-600">
              {topic.overview.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 32)}>{paragraph}</p>)}
            </div>
          </section>

          <section id="concepts" className="scroll-mt-28">
            <h2 className="text-3xl font-semibold tracking-tight text-ink-900">What the track covers</h2>
            <ol className="mt-8 divide-y divide-line border-y border-line">
              {topic.concepts.map((concept, index) => {
                const Icon = topicIconMap[concept.icon];
                return (
                  <li key={concept.title} className="grid grid-cols-[3rem_1fr] gap-5 py-6 sm:grid-cols-[3rem_1fr_2.5rem]">
                    <span className="font-mono text-sm text-ink-400">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-ink-900">{concept.title}</h3>
                      <p className="mt-2 leading-7 text-ink-500">{concept.description}</p>
                    </div>
                    <Icon size={20} className="hidden text-primary-500 sm:block" aria-hidden />
                  </li>
                );
              })}
            </ol>
          </section>

          <section id="outcomes" className="scroll-mt-28 rounded-md bg-primary-50 p-8 md:p-10">
            <h2 className="text-2xl font-semibold tracking-tight text-ink-900">By the end you will be able to</h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {topic.outcomes.map((outcome) => <li key={outcome} className="flex gap-3 leading-7 text-ink-700"><span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-md bg-primary-500" />{outcome}</li>)}
            </ul>
          </section>
        </div>
      </div>

      {topic.steps && topic.steps.length > 0 && <TopicSteps steps={topic.steps} />}
      {topic.example && <TopicExample example={topic.example} />}
      {topic.artifacts && topic.artifacts.length > 0 && <TopicArtifacts artifacts={topic.artifacts} />}
      <TopicFaq faqs={topic.faqs} />
      <TopicRelated related={getRelatedTopics(topic)} />
      <CtaBand />
    </>
  );
}

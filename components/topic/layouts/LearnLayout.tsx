import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/marketing-primitives";
import { CtaBand } from "@/components/sections/marketing/CtaBand";
import { getRelatedTopics, type TopicContent } from "@/content/topics";
import { TopicArtifacts, TopicExample, TopicFaq, TopicRelated, TopicSteps } from "../TopicSections";
import { TopicArt } from "@/components/illustrations";
import { topicIconMap } from "../topic-icons";

/** Learning track: a docs-style page with a pinned "at a glance" rail beside the curriculum. */
export function LearnLayout({ topic }: { topic: TopicContent }) {
  const sections = [
    { id: "overview", label: "Overview", show: true },
    { id: "concepts", label: "Modules", show: true },
    { id: "outcomes", label: "Outcomes", show: true },
  ];

  return (
    <>
      <header className="border-b border-line bg-gradient-to-b from-primary-50 to-white pb-14 pt-32 md:pt-40">
        <div className="container grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-ink-500">
            <Link href="/" className="ui-link text-ink-500">Home</Link>
            <ChevronRight size={14} />
            <span>Learn</span>
          </nav>
          <Eyebrow>{topic.eyebrow}</Eyebrow>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-ink-900 sm:text-5xl lg:text-6xl">{topic.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-600">{topic.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact" size="lg">Apply now <ArrowRight size={16} /></ButtonLink>
            <ButtonLink href="/curriculum" variant="secondary" size="lg">See the curriculum</ButtonLink>
          </div>
          </div>
          <TopicArt scene="path" seed={topic.slug} icon={topicIconMap[topic.concepts[0].icon]} className="hidden lg:block" />
        </div>
      </header>

      <div className="container grid max-w-6xl gap-12 py-16 lg:grid-cols-[16rem_1fr] lg:gap-16 lg:py-24">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <dl className="divide-y divide-line rounded-md border border-line bg-white">
            {topic.meta.map((item) => (
              <div key={item.label} className="p-4">
                <dt className="text-xs font-medium uppercase tracking-[0.12em] text-ink-500">{item.label}</dt>
                <dd className="mt-1 font-semibold text-ink-900">{item.value}</dd>
              </div>
            ))}
          </dl>
          <nav aria-label="On this page" className="mt-6 hidden lg:block">
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

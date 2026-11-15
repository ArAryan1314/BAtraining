import { CtaBand } from "@/components/sections/marketing/CtaBand";
import { SectionHeader } from "@/components/ui/marketing-primitives";
import { getRelatedTopics, type TopicContent } from "@/content/topics";
import type { TopicLook } from "../look";
import { SectionFlow, type FlowItem } from "../SectionFlow";
import { TopicHero } from "../TopicHero";
import { TopicArtifacts, TopicConcepts, TopicExample, TopicFaq, TopicOutcomes, TopicRelated, TopicSteps, SectionArt } from "../TopicSections";

/** Learning track: the curriculum comes first as a list of modules, then a bold outcomes band with its own picture. */
export function LearnLayout({ topic, look }: { topic: TopicContent; look: TopicLook }) {
  const items: FlowItem[] = [
    {
      key: "overview",
      id: "overview",
      tone: "white",
      node: (
        <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <SectionHeader eyebrow="The track" title={topic.overview.heading} align="left" />
            <div className="mt-8 space-y-5 text-lg leading-8 text-ink-600">
              {topic.overview.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 32)}>{paragraph}</p>)}
            </div>
          </div>
          <SectionArt topic={topic} step={1} />
        </div>
      ),
    },
    { key: "concepts", id: "concepts", tone: "tint", node: <TopicConcepts topic={topic} look={look} eyebrow="Curriculum" heading="What the track covers" highlight="covers" /> },
    { key: "outcomes", id: "outcomes", tone: "brand", node: <TopicOutcomes topic={topic} look={look} /> },
  ];
  if (topic.steps?.length) items.push({ key: "steps", tone: "white", node: <TopicSteps topic={topic} steps={topic.steps} look={look} /> });
  if (topic.example) items.push({ key: "example", tone: "soft", narrow: true, node: <TopicExample example={topic.example} /> });
  if (topic.artifacts?.length) items.push({ key: "artifacts", tone: "dark", node: <TopicArtifacts topic={topic} artifacts={topic.artifacts} look={look} /> });
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

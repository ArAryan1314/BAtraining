import { getRelatedTopics, type TopicContent } from "@/content/topics";
import { CtaBand } from "@/components/sections/marketing/CtaBand";
import { CareerLayout } from "./layouts/CareerLayout";
import { LearnLayout } from "./layouts/LearnLayout";
import { ResourceLayout } from "./layouts/ResourceLayout";
import { topicLook, type TopicLook } from "./look";
import { SectionFlow, type FlowItem } from "./SectionFlow";
import { TopicHero } from "./TopicHero";
import { TopicArtifacts, TopicConcepts, TopicExample, TopicFaq, TopicOverview, TopicRelated, TopicSteps } from "./TopicSections";

/** Product-explainer layout, used by the platform pages. */
function PlatformLayout({ topic, look }: { topic: TopicContent; look: TopicLook }) {
  const items: FlowItem[] = [
    { key: "overview", tone: "white", node: <TopicOverview topic={topic} look={look} /> },
    { key: "concepts", tone: "tint", node: <TopicConcepts topic={topic} look={look} /> },
  ];
  if (topic.steps?.length) items.push({ key: "steps", tone: "white", node: <TopicSteps topic={topic} steps={topic.steps} look={look} /> });
  if (topic.example) items.push({ key: "example", tone: "soft", narrow: true, node: <TopicExample example={topic.example} /> });
  if (topic.artifacts?.length) items.push({ key: "artifacts", tone: "dark", node: <TopicArtifacts topic={topic} artifacts={topic.artifacts} look={look} /> });
  items.push({ key: "faq", tone: "soft", node: <TopicFaq topic={topic} faqs={topic.faqs} /> });
  items.push({ key: "related", tone: "white", node: <TopicRelated related={getRelatedTopics(topic)} /> });

  return (
    <>
      <TopicHero topic={topic} />
      <SectionFlow items={items} shape={look.divider} pattern={look.pattern} />
      <CtaBand />
    </>
  );
}

const layouts: Record<TopicContent["category"], (props: { topic: TopicContent; look: TopicLook }) => React.ReactNode> = {
  learn: LearnLayout,
  career: CareerLayout,
  resources: ResourceLayout,
  platform: PlatformLayout,
};

/**
 * Each content category gets its own page structure, so a track, a career guide and a reference sheet don't read as
 * one template. The page is wrapped in its own colour theme, and its pattern, dividers and list styles come from the
 * same `look`, so two pages in one category still differ.
 */
export function TopicPage({ topic }: { topic: TopicContent }) {
  const Layout = layouts[topic.category];
  const look = topicLook(topic.slug);
  return (
    <div className={look.theme}>
      <Layout topic={topic} look={look} />
    </div>
  );
}

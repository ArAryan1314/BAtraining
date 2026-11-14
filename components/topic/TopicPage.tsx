import { getRelatedTopics, type TopicContent } from "@/content/topics";
import { CtaBand } from "@/components/sections/marketing/CtaBand";
import { CareerLayout } from "./layouts/CareerLayout";
import { LearnLayout } from "./layouts/LearnLayout";
import { ResourceLayout } from "./layouts/ResourceLayout";
import { TopicHero } from "./TopicHero";
import { TopicArtifacts, TopicConcepts, TopicExample, TopicFaq, TopicOverview, TopicRelated, TopicSteps } from "./TopicSections";

/** Product-explainer layout, used by the platform pages. */
function PlatformLayout({ topic }: { topic: TopicContent }) {
  return (
    <>
      <TopicHero topic={topic} />
      <TopicOverview topic={topic} />
      <TopicConcepts topic={topic} />
      {topic.steps && topic.steps.length > 0 && <TopicSteps steps={topic.steps} />}
      {topic.example && <TopicExample example={topic.example} />}
      {topic.artifacts && topic.artifacts.length > 0 && <TopicArtifacts artifacts={topic.artifacts} />}
      <TopicFaq faqs={topic.faqs} />
      <TopicRelated related={getRelatedTopics(topic)} />
      <CtaBand />
    </>
  );
}

const layouts: Record<TopicContent["category"], (props: { topic: TopicContent }) => React.ReactNode> = {
  learn: LearnLayout,
  career: CareerLayout,
  resources: ResourceLayout,
  platform: PlatformLayout,
};

/** Each content category gets its own page structure, so a track, a career guide and a reference sheet don't read as one template. */
export function TopicPage({ topic }: { topic: TopicContent }) {
  const Layout = layouts[topic.category];
  return <Layout topic={topic} />;
}

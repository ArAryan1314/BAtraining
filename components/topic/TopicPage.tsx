import { getRelatedTopics, type TopicContent } from "@/content/topics";
import { CtaBand } from "@/components/sections/marketing/CtaBand";
import { TopicHero } from "./TopicHero";
import {
  TopicArtifacts,
  TopicConcepts,
  TopicExample,
  TopicFaq,
  TopicOverview,
  TopicRelated,
  TopicSteps,
  TopicTerms,
} from "./TopicSections";

/** Renders any `TopicContent` entry as a full marketing page. Sections appear only when data exists. */
export function TopicPage({ topic }: { topic: TopicContent }) {
  const isFaqPage = topic.slug === "faq";

  return (
    <>
      <TopicHero topic={topic} />
      <TopicOverview topic={topic} />
      {topic.terms && topic.terms.length > 0 && <TopicTerms terms={topic.terms} />}
      <TopicConcepts topic={topic} />
      {topic.steps && topic.steps.length > 0 && <TopicSteps steps={topic.steps} />}
      {topic.example && <TopicExample example={topic.example} />}
      {topic.artifacts && topic.artifacts.length > 0 && <TopicArtifacts artifacts={topic.artifacts} />}
      <TopicFaq faqs={topic.faqs} large={isFaqPage} />
      <TopicRelated related={getRelatedTopics(topic)} />
      <CtaBand />
    </>
  );
}

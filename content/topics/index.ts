import { careerTopics } from "./career";
import { learnTopics } from "./learn";
import { platformTopics } from "./platform";
import { resourceTopics } from "./resources";
import type { TopicContent } from "./types";

export type { TopicContent, TopicIcon, TopicCategory } from "./types";

export const topics: TopicContent[] = [...platformTopics, ...learnTopics, ...careerTopics, ...resourceTopics];

const bySlug = new Map(topics.map((topic) => [topic.slug, topic]));

export function getTopic(slug: string): TopicContent | undefined {
  return bySlug.get(slug);
}

export function getRelatedTopics(topic: TopicContent): TopicContent[] {
  return topic.related.map((slug) => bySlug.get(slug)).filter((t): t is TopicContent => Boolean(t));
}

export const topicSlugs = topics.map((topic) => topic.slug);

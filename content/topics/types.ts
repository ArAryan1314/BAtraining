/**
 * Content contract for every data-driven public page rendered by
 * `components/topic/TopicPage`. Pages are pure data; all styling lives in the
 * component layer.
 */

export const topicIcons = [
  "book-open",
  "compass",
  "target",
  "presentation",
  "file-text",
  "folder-kanban",
  "award",
  "settings",
  "briefcase",
  "bar-chart",
  "users",
  "route",
  "graduation-cap",
  "building",
  "shopping-cart",
  "wrench",
  "database",
  "layout-template",
  "list-checks",
  "workflow",
  "message-square",
  "lightbulb",
  "shield-check",
  "search",
  "git-branch",
  "layers",
  "table",
  "sparkles",
  "clipboard-list",
  "trending-up",
  "puzzle",
  "mic",
] as const;

export type TopicIcon = (typeof topicIcons)[number];

export type TopicCategory = "learn" | "career" | "resources" | "platform";

export interface TopicContent {
  slug: string;
  category: TopicCategory;
  /** Short uppercase-ish label above the title, e.g. "Learning track". */
  eyebrow: string;
  /** Page H1. Keep under ~60 characters. */
  title: string;
  /** Optional substring of `title` rendered as an accent. Must appear verbatim in `title`. */
  highlight?: string;
  /** Hero lede, 1–2 sentences. Also used as the meta description. */
  summary: string;
  /** 3–4 quick facts shown as hero chips, e.g. { label: "Level", value: "Beginner" }. */
  meta: { label: string; value: string }[];
  overview: { heading: string; paragraphs: string[] };
  /** 4–6 concrete "you will be able to…" statements. */
  outcomes: string[];
  /** 4–6 key concepts / pillars. */
  concepts: { title: string; description: string; icon: TopicIcon }[];
  /** Optional ordered process (3–6 steps). */
  steps?: { title: string; description: string }[];
  /** Optional tangible deliverables / artifacts (3–5). */
  artifacts?: { name: string; description: string }[];
  /** Optional worked example rendered as a code/document panel. */
  example?: { title: string; language: "sql" | "gherkin" | "text"; code: string; caption?: string };
  /** Optional glossary-style term list (used by /glossary). */
  terms?: { term: string; definition: string }[];
  /** Optional tool names, rendered as chips. */
  tools?: string[];
  /** 3–6 questions (the /faq page may have more). */
  faqs: { question: string; answer: string }[];
  /** 2–4 slugs of other topics. */
  related: string[];
}

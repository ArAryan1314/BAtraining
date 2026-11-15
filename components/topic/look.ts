import { artSpec } from "@/components/illustrations/TopicArt";
import { topicSlugs } from "@/content/topics";

/** Theme class for each artwork colour set, in the same order as the sets in TopicArt. "" is the default indigo. */
const THEME_CLASSES = ["", "theme-emerald", "theme-amber", "theme-rose", "theme-violet", "theme-sky"] as const;

export const PATTERNS = ["grid", "dots", "diagonal", "waves", "rings", "chevrons", "crosses", "circuit", "triangles"] as const;
export const DIVIDERS = ["wave", "slant", "arch", "teeth"] as const;
export const LIST_STYLES = ["cards", "zigzag", "banded", "centered"] as const;

export type PatternName = (typeof PATTERNS)[number];
export type DividerName = (typeof DIVIDERS)[number];
export type ListStyle = (typeof LIST_STYLES)[number];

export interface TopicLook {
  /** Class that recolours the whole page. */
  theme: string;
  /** Background pattern used in the banner and the tinted and dark sections. */
  pattern: PatternName;
  /** Shape of the edge between two sections of different colour. */
  divider: DividerName;
  /** How the key-concept list is laid out. */
  list: ListStyle;
  /** Whether lists and pictures swap sides on this page. */
  flip: boolean;
  /** Steps run down a rail on one side, or alternate either side of a centre line. */
  steps: "rail" | "alternating";
}

/**
 * The look of a page, taken from its place in the list of pages. The colour comes from the page's artwork, and the
 * pattern, divider, list and step styles step through their options at different rates, so 36 pages give 36
 * different combinations. Anything not in the list (a new page not yet added) falls back to the first look.
 */
export function topicLook(slug: string): TopicLook {
  const index = Math.max(0, topicSlugs.indexOf(slug));
  return {
    theme: THEME_CLASSES[artSpec(slug).palette],
    pattern: PATTERNS[index % PATTERNS.length],
    divider: DIVIDERS[index % DIVIDERS.length],
    list: LIST_STYLES[(index + Math.floor(index / LIST_STYLES.length)) % LIST_STYLES.length],
    flip: index % 2 === 1,
    steps: Math.floor(index / 2) % 2 === 0 ? "rail" : "alternating",
  };
}

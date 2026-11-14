import assert from "node:assert/strict";
import { test } from "node:test";
import { topics } from "@/content/topics";
import { truncate } from "@/lib/seo";

const duplicates = (values: string[]) => values.filter((value, index) => values.indexOf(value) !== index);
const normal = (text: string) => text.toLowerCase().replace(/\s+/g, " ").trim();

test("every page has a unique slug, title, h1 summary and overview heading", () => {
  for (const field of ["slug", "title", "summary"] as const) assert.deepEqual(duplicates(topics.map((topic) => normal(topic[field]))), [], field);
  assert.deepEqual(duplicates(topics.map((topic) => normal(topic.overview.heading))), [], "overview heading");
});

test("titles fit a search result and descriptions truncate cleanly", () => {
  for (const topic of topics) {
    assert.ok(topic.title.length <= 60, `${topic.slug} title is ${topic.title.length} characters`);
    const description = truncate(topic.summary);
    assert.ok(description.length <= 155, topic.slug);
    assert.ok(topic.summary.length >= 50, `${topic.slug} summary is too thin to be a description`);
  }
});

test("no paragraph, FAQ question or concept is copied between pages", () => {
  const seen = new Map<string, string>();
  for (const topic of topics) {
    // /faq is a deliberate roll-up of questions answered elsewhere, so its questions are exempt.
    const questions = topic.slug === "faq" ? [] : topic.faqs.map((faq) => faq.question);
    const texts = [...topic.overview.paragraphs, ...questions, ...topic.concepts.map((concept) => concept.description)];
    for (const text of texts.map(normal)) {
      const owner = seen.get(text);
      assert.ok(!owner || owner === topic.slug, `"${text.slice(0, 60)}…" appears on both ${owner} and ${topic.slug}`);
      seen.set(text, topic.slug);
    }
  }
});

test("related links point at real, different pages", () => {
  const slugs = new Set(topics.map((topic) => topic.slug));
  for (const topic of topics) for (const related of topic.related) {
    assert.ok(slugs.has(related), `${topic.slug} links to missing ${related}`);
    assert.notEqual(related, topic.slug);
  }
});

test("truncate cuts on a word boundary", () => {
  const cut = truncate("word ".repeat(60), 40);
  assert.ok(cut.length <= 40 && cut.endsWith("…") && !cut.includes("wor…"));
});

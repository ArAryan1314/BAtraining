import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { test } from "node:test";
import { TopicArt, artSpec } from "@/components/illustrations/TopicArt";
import { topics } from "@/content/topics";

const markup = (seed: string, tone: "light" | "dark" = "dark") => renderToStaticMarkup(createElement(TopicArt, { seed, tone }));

test("no two pages share identical artwork", () => {
  const seen = new Map<string, string>();
  for (const topic of topics) {
    const svg = markup(topic.slug);
    const owner = seen.get(svg);
    assert.ok(!owner, `${topic.slug} has the same artwork as ${owner}`);
    seen.set(svg, topic.slug);
  }
  assert.equal(seen.size, topics.length);
});

test("the same page always gets the same artwork", () => {
  assert.equal(markup("business-analysis"), markup("business-analysis"));
  assert.deepEqual(artSpec("jira"), artSpec("jira"));
});

test("scenes and colours are spread across the pages, not clustered", () => {
  const specs = topics.map((topic) => artSpec(topic.slug));
  const scenes = new Set(specs.map((spec) => spec.scene));
  const palettes = new Set(specs.map((spec) => spec.palette));
  const combinations = new Set(specs.map((spec) => `${spec.scene}/${spec.palette}`));
  assert.equal(scenes.size, 4, "every scene is used");
  assert.equal(palettes.size, 4, "every colour set is used");
  assert.ok(combinations.size >= 10, `only ${combinations.size} scene and colour combinations are used`);
  for (const scene of scenes) assert.ok(specs.filter((spec) => spec.scene === scene).length <= Math.ceil(topics.length * 0.4), `${scene} is overused`);
});

test("the light and dark versions differ, and an explicit scene is respected", () => {
  assert.notEqual(markup("roadmap", "light"), markup("roadmap", "dark"));
  const forced = renderToStaticMarkup(createElement(TopicArt, { seed: "roadmap", scene: "growth" }));
  assert.notEqual(forced, markup("roadmap", "light"));
});

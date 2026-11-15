import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { test } from "node:test";
import { TopicArt, artPalettes, artSceneFor, artSceneNames, artSpec } from "@/components/illustrations/TopicArt";
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
  assert.equal(scenes.size, artSceneNames.length, "every scene is used");
  assert.equal(palettes.size, artPalettes.length, "every colour set is used");
  assert.equal(combinations.size, topics.length, "no two pages share a scene and colour set");
  for (const scene of scenes) assert.ok(specs.filter((spec) => spec.scene === scene).length <= Math.ceil(topics.length * 0.4), `${scene} is overused`);
});

test("the light and dark versions differ, and an explicit scene is respected", () => {
  assert.notEqual(markup("roadmap", "light"), markup("roadmap", "dark"));
  const forced = renderToStaticMarkup(createElement(TopicArt, { seed: "roadmap", scene: "growth" }));
  assert.notEqual(forced, markup("roadmap", "light"));
});

test("the pictures further down a page are different scenes from the banner and from each other", () => {
  for (const topic of topics) {
    const used = [artSpec(topic.slug).scene, ...[1, 2, 3].map((step) => artSceneFor(topic.slug, step))];
    assert.equal(new Set(used).size, used.length, `${topic.slug} repeats a scene`);
  }
});

import assert from "node:assert/strict";
import { test } from "node:test";
import { topicLook } from "@/components/topic/look";
import { topics } from "@/content/topics";

test("no two pages share the same theme, pattern and divider", () => {
  const seen = new Map<string, string>();
  for (const topic of topics) {
    const look = topicLook(topic.slug);
    const key = `${look.theme}/${look.pattern}/${look.divider}`;
    assert.ok(!seen.has(key), `${topic.slug} looks the same as ${seen.get(key)}`);
    seen.set(key, topic.slug);
  }
});

test("every kind of list and step layout is used, and a look never changes", () => {
  const looks = topics.map((topic) => topicLook(topic.slug));
  assert.equal(new Set(looks.map((look) => look.list)).size, 4);
  assert.equal(new Set(looks.map((look) => look.steps)).size, 2);
  assert.deepEqual(topicLook("jira"), topicLook("jira"));
});

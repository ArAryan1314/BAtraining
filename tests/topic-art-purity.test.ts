import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { test } from "node:test";
import { artPalettes, artScenes } from "@/components/illustrations/TopicArt";

// In development React renders every component twice with the same props. If a scene consumed a random sequence
// that lives outside it, the second pass drew different shapes than the first, and the browser's version no longer
// matched the server's HTML ("hydration failed").
test("every scene draws the same shapes each time it is rendered with the same props", () => {
  for (const [name, Scene] of Object.entries(artScenes)) {
    for (const palette of artPalettes) {
      const props = { seed: `sign-in:${name}`, dark: true, p: palette };
      const first = renderToStaticMarkup(createElement("svg", null, createElement(Scene, props)));
      const second = renderToStaticMarkup(createElement("svg", null, createElement(Scene, props)));
      assert.equal(second, first, `${name} is not pure`);
    }
  }
});

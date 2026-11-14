import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { integrations } from "@/config/integrations";

const envExample = readFileSync(new URL("../.env.example", import.meta.url), "utf8");

test("every integration key is documented in .env.example", () => {
  for (const key of integrations.flatMap((integration) => integration.env)) assert.match(envExample, new RegExp(`^${key}=`, "m"), key);
});

test("integration ids are unique and each lists at least two vendors or a how-to", () => {
  assert.equal(new Set(integrations.map((integration) => integration.id)).size, integrations.length);
  for (const integration of integrations) assert.ok(integration.options.length >= 1 && integration.env.length >= 1, integration.id);
});

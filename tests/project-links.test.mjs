import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const siteContent = await readFile(
  new URL("../data/siteContent.js", import.meta.url),
  "utf8",
);

const appStoreLinks = [
  "https://apps.apple.com/us/app/exhibit-a-cleaner-living/id6764465012",
  "https://apps.apple.com/us/app/been-there-done-that/id6807964127",
];

test("project App Store buttons use the direct product URLs", () => {
  for (const appStoreLink of appStoreLinks) {
    assert.match(siteContent, new RegExp(`href: ["']${appStoreLink}["']`));
  }

  assert.doesNotMatch(siteContent, /apps\.apple\.com\/us\/search\?/);
});

test("both App Store links use the shared button label and external behavior", () => {
  const appStoreButtonDefinitions = siteContent.match(
    /href: ["']https:\/\/apps\.apple\.com\/us\/app\/[^"']+["'],\s+label: ["']VIEW ON APP STORE["'],\s+external: true/g,
  );

  assert.equal(appStoreButtonDefinitions?.length, appStoreLinks.length);
});

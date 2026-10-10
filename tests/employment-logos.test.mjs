import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const siteContent = await readFile(
  new URL("../data/siteContent.js", import.meta.url),
  "utf8",
);
const homePage = await readFile(
  new URL("../app/page.jsx", import.meta.url),
  "utf8",
);

const expectedLogoPaths = [
  "/images/employers/nissan-logo.png",
  "/images/employers/gdms-logo.png",
  "/images/employers/openap_logo.png",
];

test("every employer uses its expected local logo asset", () => {
  for (const logoPath of expectedLogoPaths) {
    assert.match(siteContent, new RegExp(`logoSrc: ["']${logoPath}["']`));
  }

  assert.equal(
    new Set(expectedLogoPaths).size,
    expectedLogoPaths.length,
    "logo paths must be unique",
  );
});

test("employer logo assets are valid, reasonably sized PNG files", async () => {
  const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  for (const logoPath of expectedLogoPaths) {
    const image = await readFile(
      new URL(`../public${logoPath}`, import.meta.url),
    );

    assert.deepEqual(image.subarray(0, pngSignature.length), pngSignature);
    assert.ok(image.length <= 5 * 1024 * 1024, `${logoPath} exceeds 5 MB`);
  }
});

test("employment logos stay bounded and do not cover card content", () => {
  assert.match(homePage, /glass-panel glass-panel-hover relative/);
  assert.match(homePage, /pr-20 text-left sm:pr-28 md:pr-36/);
  assert.match(homePage, /absolute right-\[var\(--mobile-card-padding\)\]/);
  assert.match(homePage, /h-full w-full object-contain object-center/);
  assert.match(homePage, /gdms:[\s\S]*bg-\[#090b10\]/);
});

test("missing logo files fail without exposing a broken image", () => {
  assert.match(homePage, /if \(!src \|\| hasLoadError\)/);
  assert.match(homePage, /onError=\{\(\) => setHasLoadError\(true\)\}/);
  assert.match(homePage, /alt=""/);
});

test("OpenAP tooling lists Sigma and AI automation before Python", () => {
  assert.match(
    siteContent,
    /Use Sigma, AI automation, Python, Google Colab, Excel, Snowflake/,
  );
});

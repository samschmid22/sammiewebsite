import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const homePage = await readFile(
  new URL("../app/page.jsx", import.meta.url),
  "utf8",
);

test("header avatar keeps the requested 20 percent wider crop", () => {
  assert.match(homePage, /src="\/images\/profile\.png"/);
  assert.match(
    homePage,
    /origin-\[50%_20%\] scale-\[1\.44\] object-cover object-\[50%_20%\]/,
  );
});

test("header avatar stays clipped inside its circular frame", () => {
  assert.match(
    homePage,
    /site-header-avatar relative h-\[4\.5rem\] w-\[4\.5rem\] overflow-hidden rounded-full/,
  );
});

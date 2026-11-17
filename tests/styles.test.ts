import { afterEach, expect, it } from "vitest";
import { readFileSync } from "node:fs";

function rules(sheet: CSSStyleSheet): CSSStyleRule[] {
  const result: CSSStyleRule[] = [];
  function visit(items: CSSRuleList) {
    for (const item of Array.from(items)) {
      if ("selectorText" in item) result.push(item as CSSStyleRule);
      if ("cssRules" in item) visit((item as CSSMediaRule).cssRules);
    }
  }
  visit(sheet.cssRules);
  return result;
}
function load(path: string) {
  const style = document.createElement("style");
  style.textContent = readFileSync(path, "utf8");
  document.head.append(style);
  return rules(style.sheet!);
}
afterEach(() => {
  document.head.querySelectorAll("style").forEach((s) => s.remove());
  document.body.innerHTML = "";
});

it("homepage Uncle Lee gradient matches its photo card, never demo or hero wrappers", () => {
  const css = load("app/globals.css");
  document.body.innerHTML =
    '<article class="brand-card uncle"></article><article class="brand-collage uncle"></article><div class="demo-page uncle"></div><dialog class="product-dialog uncle"></dialog>';
  const overlays = css.filter(
    (r) =>
      /::?after/.test(r.selectorText) && !!r.style.getPropertyValue("content"),
  );
  for (const overlay of overlays) {
    const targets = overlay.selectorText.replace(/::?after/g, "");
    expect(
      document.querySelector(".demo-page")!.matches(targets),
      overlay.selectorText,
    ).toBe(false);
    expect(
      document.querySelector(".product-dialog")!.matches(targets),
      overlay.selectorText,
    ).toBe(false);
  }
  const home = overlays.find((r) => r.selectorText.includes("uncle"))!;
  expect(
    document
      .querySelector(".brand-card")!
      .matches(home.selectorText.replace(/::?after/g, "")),
  ).toBe(true);
  expect(home.style.getPropertyValue("background")).toContain(
    "linear-gradient(",
  );
  expect(home.style.getPropertyValue("pointer-events")).toBe("none");
  expect(
    getComputedStyle(document.querySelector(".demo-page")!).color,
  ).not.toBe("rgb(255, 255, 255)");
});
it("decorative demo layers and pseudo-elements explicitly ignore pointer input", () => {
  const css = load("app/demo/demo.css");
  for (const selector of [
    ".choice-halo",
    ".theatre-glow",
    ".virtual-path::before",
    ".virtual-shelf",
    ".travelling-product",
    ".tray-light",
    ".reveal-orbit",
    ".demo-page::after",
    ".product-dialog::after",
  ]) {
    expect(
      css.some(
        (r) =>
          r.selectorText
            .split(",")
            .map((s) => s.trim())
            .includes(selector) &&
          r.style.getPropertyValue("pointer-events") === "none",
      ),
      selector,
    ).toBe(true);
  }
});

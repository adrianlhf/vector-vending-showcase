import { describe, expect, it } from "vitest";
import { existsSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { machines } from "../app/demo/catalogue";
describe("vending catalogue assets and provenance", () => {
  for (const machine of machines)
    it(`${machine.short}: unique, real image assets and official public sources for every item`, () => {
      expect(new Set(machine.products.map((p) => p.id)).size).toBe(
        machine.products.length,
      );
      expect(new Set(machine.products.map((p) => p.image)).size).toBe(
        machine.products.length,
      );
      for (const product of machine.products) {
        const image = resolve("public/assets", product.image);
        expect(existsSync(image), product.name).toBe(true);
        expect(statSync(image).size).toBeGreaterThan(1000);
        expect(new URL(product.source).hostname).toBe(
          machine.id === "polar"
            ? "polarpuffs-cakes.com"
            : "uncleleeconfectionery.cococart.co",
        );
        expect(product.description).not.toMatch(/\$|available now|in stock/i);
      }
    });
  it("keeps whole rolls, slices and minis separate using supplier item identities", () => {
    const products = machines[0].products;
    expect(new Set(products.map((p) => p.supplierCode)).size).toBe(19);
    for (const product of products) {
      expect(product.supplierCode).toMatch(/^FG/);
      expect(product.rangeEvidence).toContain("2 November 2026");
    }
  });
});

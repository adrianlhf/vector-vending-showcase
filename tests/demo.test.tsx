import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Demo from "../app/demo/page";
import { machines } from "../app/demo/catalogue";

const preference = vi.hoisted(() => ({ reduce: false }));
vi.mock("framer-motion", async (importOriginal) => ({
  ...(await importOriginal<typeof import("framer-motion")>()),
  useReducedMotion: () => preference.reduce,
}));
beforeEach(() => {
  preference.reduce = false;
  vi.mocked(window.matchMedia).mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
  vi.useFakeTimers();
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});
const advance = async (ms: number) => {
  await act(async () => {
    vi.advanceTimersByTime(ms);
  });
};
const choose = (name: string) =>
  fireEvent.click(
    screen.getByRole("button", { name: `Explore ${name} machine` }),
  );
async function vend() {
  fireEvent.click(screen.getByRole("button", { name: "Dispense" }));
  await advance(2200);
  await advance(850);
}

describe("curated vending experience", () => {
  for (const machine of machines)
    it(`${machine.short}: selection, dispense, reveal, close, replay, switch`, async () => {
      render(<Demo />);
      choose(machine.name);
      const second = machine.products[1];
      fireEvent.click(
        screen.getByRole("button", { name: `Select ${second.name}` }),
      );
      expect(
        screen
          .getByRole("button", { name: `Select ${second.name}` })
          .getAttribute("aria-pressed"),
      ).toBe("true");
      fireEvent.click(screen.getByRole("button", { name: "Dispense" }));
      expect(
        (
          screen.getByRole("button", {
            name: `Select ${second.name}`,
          }) as HTMLButtonElement
        ).disabled,
      ).toBe(true);
      await advance(2200);
      expect(screen.getByRole("status").textContent).toContain(
        "collection area",
      );
      await advance(850);
      const modal = screen.getByRole("dialog");
      expect(modal.getAttribute("open")).toBe("");
      expect(
        within(modal).getByRole("heading", { name: new RegExp(second.name) }),
      ).toBeTruthy();
      fireEvent.click(
        within(modal).getByRole("button", { name: "Replay selection" }),
      );
      expect(screen.queryByRole("dialog")).toBeNull();
      await advance(2200);
      await advance(850);
      fireEvent.click(
        screen.getByRole("button", { name: "Close product reveal" }),
      );
      await advance(20);
      expect(document.activeElement).toBe(
        screen.getByRole("button", { name: "Dispense" }),
      );
      await vend();
      fireEvent.click(
        within(screen.getByRole("dialog")).getByRole("button", {
          name: "Switch machines",
        }),
      );
      expect(
        screen.getByRole("heading", { name: /A little joy/ }),
      ).toBeTruthy();
      choose(machines.find((m) => m.id !== machine.id)!.name);
      expect(screen.getByRole("button", { name: "Dispense" })).toBeTruthy();
    });
  it("switching during a dispense cancels stale reveal timers", async () => {
    render(<Demo />);
    choose(machines[0].name);
    fireEvent.click(screen.getByRole("button", { name: "Dispense" }));
    fireEvent.click(screen.getByRole("button", { name: "Switch machines" }));
    choose(machines[1].name);
    await advance(5000);
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.getByRole("status").textContent).toContain(
      "Kaya Cake selected",
    );
  });
  it("still mode gives the same reveal without the long animation and Escape closes it", async () => {
    render(<Demo />);
    choose(machines[0].name);
    fireEvent.click(screen.getByRole("button", { name: "Still mode" }));
    fireEvent.click(screen.getByRole("button", { name: "Dispense" }));
    await advance(100);
    await advance(150);
    const modal = screen.getByRole("dialog");
    expect(modal).toBeTruthy();
    fireEvent(modal, new Event("cancel", { cancelable: true, bubbles: true }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });
  it("starts silent and exposes a controlled audio toggle", () => {
    render(<Demo />);
    choose(machines[0].name);
    expect(
      screen
        .getByRole("button", { name: "Turn sound on" })
        .getAttribute("aria-pressed"),
    ).toBe("false");
    fireEvent.click(screen.getByRole("button", { name: "Turn sound on" }));
    expect(
      screen
        .getByRole("button", { name: "Turn sound off" })
        .getAttribute("aria-pressed"),
    ).toBe("true");
  });
  it("uses product-specific image fallbacks without breaking selection", () => {
    render(<Demo />);
    choose(machines[0].name);
    const tile = screen.getByRole("button", {
      name: "Select Pandan Swiss Roll Slice",
    });
    fireEvent.error(tile.querySelector("img")!);
    expect(within(tile).getByRole("img", { name: "" })).toBeTruthy();
    fireEvent.click(tile);
    expect(tile.getAttribute("aria-pressed")).toBe("true");
  });
  it("allows keyboard-only machine and product choice", async () => {
    vi.useRealTimers();
    const user = userEvent.setup();
    render(<Demo />);
    const button = screen.getByRole("button", {
      name: "Explore Polar Puffs & Cakes machine",
    });
    button.focus();
    await user.keyboard("{Enter}");
    expect(document.activeElement?.id).toBe("machine-title");
    const product = screen.getByRole("button", {
      name: "Select Strawberry Swiss Roll Slice",
    });
    product.focus();
    await user.keyboard(" ");
    expect(product.getAttribute("aria-pressed")).toBe("true");
  });
});

for (const machine of machines)
  for (const product of machine.products)
    it(`reveals ${machine.short} ${product.name}`, async () => {
      render(<Demo />);
      choose(machine.name);
      fireEvent.click(screen.getByRole("button", { name: "Still mode" }));
      fireEvent.click(
        screen.getByRole("button", { name: `Select ${product.name}` }),
      );
      fireEvent.click(screen.getByRole("button", { name: "Dispense" }));
      await advance(100);
      await advance(150);
      expect(
        within(screen.getByRole("dialog")).getByRole("heading", {
          name: (name) => name.startsWith(product.name),
        }),
      ).toBeTruthy();
    });
it("honours the system reduced-motion preference without a toggle", async () => {
  preference.reduce = true;
  render(<Demo />);
  choose(machines[0].name);
  fireEvent.click(screen.getByRole("button", { name: "Dispense" }));
  await advance(100);
  await advance(150);
  expect(screen.getByRole("dialog")).toBeTruthy();
});
it("handles an empty catalogue without starting a dispense", () => {
  const saved = [...machines[0].products];
  machines[0].products.splice(0);
  try {
    render(<Demo />);
    choose(machines[0].name);
    expect(screen.getByText(/selection is being refreshed/)).toBeTruthy();
    expect(
      (screen.getByRole("button", { name: "Dispense" }) as HTMLButtonElement)
        .disabled,
    ).toBe(true);
  } finally {
    machines[0].products.push(...saved);
  }
});

function narrowLayout() {
  vi.mocked(window.matchMedia).mockImplementation((query) => ({
    matches: query === "(max-width: 700px)",
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}
for (const machine of machines)
  it(`narrow ${machine.short}: stage is focused before drop, then reveal, then replay`, async () => {
    narrowLayout();
    render(<Demo />);
    choose(machine.name);
    fireEvent.click(screen.getByRole("button", { name: "Dispense" }));
    const stage = screen.getByRole("region", {
      name: "Virtual dispensing stage",
    });
    expect(stage.classList.contains("spotlight")).toBe(true);
    expect(document.activeElement).toBe(stage);
    expect(document.body.style.overflow).toBe("hidden");
    expect(
      stage.querySelector(".machine-object")?.classList.contains("preparing"),
    ).toBe(true);
    await advance(179);
    expect(stage.querySelector(".travelling-product")).toBeNull();
    expect(screen.queryByRole("dialog")).toBeNull();
    await advance(1);
    expect(
      stage.querySelector(".machine-object")?.classList.contains("dispensing"),
    ).toBe(true);
    await advance(2200);
    expect(
      stage.querySelector(".machine-object")?.classList.contains("ready"),
    ).toBe(true);
    expect(screen.queryByRole("dialog")).toBeNull();
    await advance(850);
    expect(screen.getByRole("dialog")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Replay selection" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(stage);
    expect(stage.querySelector(".travelling-product")).toBeNull();
    await advance(180);
    await advance(2200);
    await advance(850);
    expect(screen.getByRole("dialog")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Try another" }));
    await advance(20);
    fireEvent.click(screen.getByRole("button", { name: "Dispense" }));
    expect(document.activeElement).toBe(stage);
  });
for (const elapsed of [0, 180, 2380])
  it(`narrow cancellation at ${elapsed}ms prevents stale drops and reveals`, async () => {
    narrowLayout();
    render(<Demo />);
    choose(machines[0].name);
    fireEvent.click(screen.getByRole("button", { name: "Dispense" }));
    if (elapsed) {
      await advance(180);
      if (elapsed > 180) await advance(elapsed - 180);
    }
    fireEvent.click(screen.getByRole("button", { name: "Cancel / switch" }));
    choose(machines[1].name);
    await advance(5000);
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.body.style.overflow).toBe("");
    expect(screen.getByRole("button", { name: "Dispense" })).toBeTruthy();
  });
it("narrow reduced motion shows a still stage before revealing, without scrolling", async () => {
  narrowLayout();
  preference.reduce = true;
  render(<Demo />);
  choose(machines[0].name);
  fireEvent.click(screen.getByRole("button", { name: "Dispense" }));
  expect(document.activeElement).toBe(
    screen.getByRole("region", { name: "Virtual dispensing stage" }),
  );
  await advance(180);
  expect(screen.queryByRole("dialog")).toBeNull();
  await advance(100);
  expect(screen.queryByRole("dialog")).toBeNull();
  await advance(150);
  expect(screen.getByRole("dialog")).toBeTruthy();
});

it("narrow stage keeps keyboard focus on cancellation and Escape cancels preparation", async () => {
  narrowLayout();
  render(<Demo />);
  choose(machines[0].name);
  fireEvent.click(screen.getByRole("button", { name: "Dispense" }));
  const stage = screen.getByRole("region", {
    name: "Virtual dispensing stage",
  });
  fireEvent.keyDown(stage, { key: "Tab" });
  expect(document.activeElement).toBe(
    screen.getByRole("button", { name: "Cancel / switch" }),
  );
  fireEvent.keyDown(document.activeElement!, { key: "Escape" });
  await advance(5000);
  expect(screen.queryByRole("dialog")).toBeNull();
  expect(
    screen.getByRole("button", { name: "Explore Polar Puffs & Cakes machine" }),
  ).toBeTruthy();
});

for (const machine of machines)
  for (const product of machine.products)
    it(`narrow full drop and correct hero image: ${machine.short} ${product.name}`, async () => {
      narrowLayout();
      render(<Demo />);
      choose(machine.name);
      fireEvent.click(
        screen.getByRole("button", { name: `Select ${product.name}` }),
      );
      fireEvent.click(screen.getByRole("button", { name: "Dispense" }));
      await advance(180);
      expect(screen.queryByRole("dialog")).toBeNull();
      const stage = screen.getByRole("region", {
        name: "Virtual dispensing stage",
      });
      expect(
        stage.querySelector(".travelling-product img")?.getAttribute("src"),
      ).toBe("/assets/" + product.image);
      await advance(2200);
      expect(screen.queryByRole("dialog")).toBeNull();
      await advance(850);
      const hero = screen.getByRole("dialog");
      expect(
        within(hero).getByRole("heading", {
          name: (name) => name.startsWith(product.name),
        }),
      ).toBeTruthy();
      expect(
        within(hero)
          .getByRole("img", { name: product.name })
          .getAttribute("src"),
      ).toBe("/assets/" + product.image);
      expect(
        within(hero)
          .getByRole("link", { name: /official brand site/ })
          .getAttribute("href"),
      ).toBe(product.source);
      fireEvent.click(
        within(hero).getByRole("button", { name: "Try another" }),
      );
    });
it("exposes the full catalogue and resets list scrolling when changing formats or machines", () => {
  render(<Demo />);
  choose(machines[0].name);
  const list = screen.getByLabelText("Polar Puffs & Cakes demo products");
  expect(within(list).getAllByRole("button").length).toBe(19);
  list.scrollTop = 500;
  fireEvent.click(screen.getByRole("button", { name: "Mini cakes" }));
  expect(list.scrollTop).toBe(0);
  expect(within(list).getAllByRole("button").length).toBe(7);
  fireEvent.click(
    within(list).getByRole("button", {
      name: "Select Cocoa Hazelnut Cake (Mini)",
    }),
  );
  fireEvent.click(screen.getByRole("button", { name: "Whole rolls & blocks" }));
  expect(within(list).getAllByRole("button").length).toBe(4);
  expect(
    screen.getByText("Cocoa Hazelnut Cake (Mini)", {
      selector: ".selection-summary strong",
    }),
  ).toBeTruthy();
  fireEvent.click(screen.getByRole("button", { name: "All" }));
  expect(within(list).getAllByRole("button").length).toBe(19);
  fireEvent.click(screen.getByRole("button", { name: "Switch machines" }));
  choose(machines[1].name);
  expect(
    within(
      screen.getByLabelText("Uncle Lee Confectionery demo products"),
    ).getAllByRole("button").length,
  ).toBe(5);
  expect(screen.queryByRole("button", { name: "Mini cakes" })).toBeNull();
});

for (const narrow of [false, true])
  for (const machine of machines)
    it(`mouse catalogue loop: ${machine.short}, ${narrow ? "narrow" : "desktop"}`, async () => {
      if (narrow) narrowLayout();
      // React Testing Library's microtask-drain wrapper detects Jest's timer
      // API; expose the equivalent Vitest advance function for this suite.
      vi.stubGlobal("jest", { advanceTimersByTime: vi.advanceTimersByTime });
      const user = userEvent.setup({
        delay: null,
        advanceTimers: vi.advanceTimersByTime,
      });
      render(<Demo />);
      await user.click(
        screen.getByRole("button", { name: `Explore ${machine.name} machine` }),
      );
      for (const product of machine.products) {
        await user.click(
          screen.getByRole("button", { name: `Select ${product.name}` }),
        );
        expect(
          screen
            .getByRole("button", { name: `Select ${product.name}` })
            .getAttribute("aria-pressed"),
        ).toBe("true");
        await user.click(screen.getByRole("button", { name: "Dispense" }));
        if (narrow) await advance(180);
        await advance(2200);
        await advance(850);
        const hero = screen.getByRole("dialog");
        expect(
          within(hero).getByRole("heading", {
            name: (n) => n.startsWith(product.name),
          }),
        ).toBeTruthy();
        expect(
          within(hero)
            .getByRole("img", { name: product.name })
            .getAttribute("src"),
        ).toBe("/assets/" + product.image);
        await user.click(
          within(hero).getByRole("button", { name: "Try another" }),
        );
        await advance(20);
      }
      await user.click(screen.getByRole("button", { name: "Switch machines" }));
      const other = machines.find((m) => m.id !== machine.id)!;
      await user.click(
        screen.getByRole("button", { name: `Explore ${other.name} machine` }),
      );
      expect(
        screen.getByRole("button", {
          name: `Select ${other.products[0].name}`,
        }),
      ).toBeTruthy();
    });

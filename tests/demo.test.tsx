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
  vi.useFakeTimers();
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
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
      name: "Select Pandan Swiss Roll",
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
      name: "Select Strawberry Swiss Roll",
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
          name: new RegExp(product.name),
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

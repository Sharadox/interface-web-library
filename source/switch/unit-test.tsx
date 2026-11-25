// @vitest-environment happy-dom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { Switch } from "@sharadox/interface-web-library/switch";

afterEach(cleanup);

test("a switch flips at once and shows a loader on itself while the change runs", async () => {
  let finish: (applied: boolean) => void = () => {};
  const change = vi.fn(() => new Promise<boolean>((resolve) => (finish = resolve)));
  const { rerender } = render(<Switch label="Required" checked={false} onChange={change} />);
  const toggle = screen.getByRole("switch", { name: "Required" });
  expect(toggle.getAttribute("aria-checked")).toBe("false");
  fireEvent.click(toggle);
  expect(change).toHaveBeenCalledWith(true);
  expect(toggle.getAttribute("aria-checked")).toBe("true");
  expect(toggle.getAttribute("aria-busy")).toBe("true");
  await act(async () => finish(true));
  rerender(<Switch label="Required" checked onChange={change} />);
  expect(toggle.getAttribute("aria-busy")).toBeNull();
  expect(toggle.getAttribute("aria-checked")).toBe("true");
});

test("a change that fails flips back", async () => {
  render(<Switch label="Required" checked onChange={async () => false} />);
  const toggle = screen.getByRole("switch", { name: "Required" });
  await act(async () => fireEvent.click(toggle));
  expect(toggle.getAttribute("aria-checked")).toBe("true");
  expect(toggle.getAttribute("aria-busy")).toBeNull();
});

test("a change answered with nothing counts as done", async () => {
  render(<Switch label="Required" checked={false} onChange={async () => undefined} />);
  const toggle = screen.getByRole("switch", { name: "Required" });
  await act(async () => fireEvent.click(toggle));
  expect(toggle.getAttribute("aria-checked")).toBe("true");
});

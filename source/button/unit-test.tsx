// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { Button } from "@sharadox/interface-web-library/button";

afterEach(cleanup);

test("a button with its look and icon, that clicks", () => {
  const click = vi.fn();
  render(
    <Button look="quiet" icon="plus" onClick={click} className="extra">
      Add
    </Button>,
  );
  const button = screen.getByRole("button", { name: "Add" });
  expect(button.getAttribute("type")).toBe("button");
  expect(button.className).toContain("extra");
  expect(button.querySelector("svg")).not.toBeNull();
  fireEvent.click(button);
  expect(click).toHaveBeenCalledOnce();
});

test("while pending: a spinner, its pending words, busy, and no clicks", () => {
  const click = vi.fn();
  const { rerender } = render(
    <Button type="submit" pending pendingLabel="Saving…" onClick={click}>
      Save
    </Button>,
  );
  const button = screen.getByRole("button", { name: "Saving…" });
  expect(button.getAttribute("aria-busy")).toBe("true");
  expect((button as HTMLButtonElement).disabled).toBe(true);
  fireEvent.click(button);
  expect(click).not.toHaveBeenCalled();
  rerender(
    <Button pending look="danger">
      Delete
    </Button>,
  );
  expect(screen.getByRole("button", { name: "Delete" }).getAttribute("aria-busy")).toBe("true");
});

// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, expect, test, vi } from "vitest";
import { Dialog } from "@sharadox/interface-web-library/dialog";

afterEach(cleanup);

beforeAll(() => {
  // happy-dom's dialog: open and close as a browser's would.
  HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
    this.removeAttribute("open");
  };
});

test("opens as a modal named by its title, and closes by its button, Escape or the backdrop", () => {
  const close = vi.fn();
  const { rerender, container } = render(
    <Dialog open onClose={close} title="Check your email" closeLabel="Close">
      <p>Inside</p>
    </Dialog>,
  );
  const dialog = container.querySelector("dialog")!;
  expect(dialog.open).toBe(true);
  expect(screen.getByRole("heading", { name: "Check your email" }).id).toBe(dialog.getAttribute("aria-labelledby"));
  fireEvent.click(screen.getByRole("button", { name: "Close" }));
  fireEvent(dialog, new Event("cancel", { cancelable: true }));
  fireEvent.click(dialog);
  fireEvent.click(screen.getByText("Inside"));
  expect(close).toHaveBeenCalledTimes(3);
  rerender(
    <Dialog open={false} onClose={close} title="Check your email" closeLabel="Close">
      <p>Inside</p>
    </Dialog>,
  );
  // It leaves the way it came, then closes.
  expect(dialog.open).toBe(true);
  expect(dialog.dataset.closing).toBe("");
  expect(screen.getByText("Inside")).toBeTruthy();
  fireEvent.animationEnd(dialog);
  expect(dialog.open).toBe(false);
  expect(dialog.dataset.closing).toBeUndefined();
  expect(screen.queryByText("Inside")).toBeNull();
  rerender(
    <Dialog open={false} onClose={close} title="Again" closeLabel="Close">
      <p>Inside</p>
    </Dialog>,
  );
  expect(dialog.open).toBe(false);
});

test("closes even when no animation runs (reduced motion), and reopens straight after", () => {
  vi.useFakeTimers();
  const close = vi.fn();
  const { rerender, container } = render(
    <Dialog open onClose={close} title="T" closeLabel="Close">
      <p>Inside</p>
    </Dialog>,
  );
  const dialog = container.querySelector("dialog")!;
  rerender(
    <Dialog open={false} onClose={close} title="T" closeLabel="Close">
      <p>Inside</p>
    </Dialog>,
  );
  rerender(
    <Dialog open onClose={close} title="T" closeLabel="Close">
      <p>Inside</p>
    </Dialog>,
  );
  expect(dialog.dataset.closing).toBeUndefined();
  rerender(
    <Dialog open={false} onClose={close} title="T" closeLabel="Close">
      <p>Inside</p>
    </Dialog>,
  );
  vi.advanceTimersByTime(400);
  expect(dialog.open).toBe(false);
  vi.useRealTimers();
});

test("closed from the start it stays closed; an animation inside it, or while open, doesn't close it", () => {
  const close = vi.fn();
  const { rerender, container } = render(
    <Dialog open={false} onClose={close} title="T" closeLabel="Close">
      <p>Inside</p>
    </Dialog>,
  );
  const dialog = container.querySelector("dialog")!;
  expect(dialog.open).toBe(false);
  rerender(
    <Dialog open onClose={close} title="T" closeLabel="Close">
      <p>Inside</p>
    </Dialog>,
  );
  fireEvent.animationEnd(dialog);
  expect(dialog.open).toBe(true);
  rerender(
    <Dialog open={false} onClose={close} title="T" closeLabel="Close">
      <p>Inside</p>
    </Dialog>,
  );
  fireEvent.animationEnd(screen.getByText("Inside"));
  expect(dialog.open).toBe(true);
  fireEvent.animationEnd(dialog);
  expect(dialog.open).toBe(false);
});

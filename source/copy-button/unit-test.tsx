// @vitest-environment happy-dom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { CopyButton } from "@sharadox/interface-web-library/copy-button";

afterEach(cleanup);

afterEach(() => vi.useRealTimers());

test("copies the value, says so for two seconds, and tells who asked", async () => {
  const writeText = vi.fn(async () => {});
  Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
  const copied = vi.fn();
  const { rerender } = render(<CopyButton value="ABCD" label="Copy" copiedLabel="Copied." onCopied={copied} />);
  vi.useFakeTimers();
  await act(async () => fireEvent.click(screen.getByRole("button", { name: "Copy" })));
  expect(writeText).toHaveBeenCalledWith("ABCD");
  expect(copied).toHaveBeenCalledOnce();
  expect(screen.getByRole("button").textContent).toBe("Copied.");
  act(() => void vi.advanceTimersByTime(2000));
  expect(screen.getByRole("button").textContent).toBe("Copy");
  rerender(<CopyButton value="EFGH" label="Copy" copiedLabel="Copied." />);
  await act(async () => fireEvent.click(screen.getByRole("button")));
  expect(writeText).toHaveBeenLastCalledWith("EFGH");
});

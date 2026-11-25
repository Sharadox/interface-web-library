// @vitest-environment happy-dom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { ToastProvider, useToast } from "@sharadox/interface-web-library/toast";

afterEach(cleanup);

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

function Trigger() {
  const { notify } = useToast();
  return (
    <>
      <button onClick={() => notify("Saved.")}>save</button>
      <button onClick={() => notify("Broken.", "error")}>fail</button>
      <button onClick={() => notify("Heads up.", "info")}>info</button>
    </>
  );
}

const setUp = () =>
  render(
    <ToastProvider label="Notifications" dismissLabel="Dismiss" duration={1000}>
      <Trigger />
    </ToastProvider>,
  );

test("shows each notification in the region, then lets it go after its time", () => {
  setUp();
  fireEvent.click(screen.getByText("save"));
  const region = screen.getByRole("region", { name: "Notifications" });
  expect(region.textContent).toContain("Saved.");
  expect(screen.getByRole("status").textContent).toContain("Saved.");
  act(() => void vi.advanceTimersByTime(1000));
  expect(region.textContent).toBe("");
});

test("errors are alerts that stay twice as long; hovering keeps one; the close button removes it", () => {
  setUp();
  fireEvent.click(screen.getByText("fail"));
  act(() => void vi.advanceTimersByTime(1500));
  const alert = screen.getByRole("alert");
  expect(alert.textContent).toContain("Broken.");
  fireEvent.mouseEnter(alert);
  act(() => void vi.advanceTimersByTime(5000));
  expect(screen.queryByRole("alert")).not.toBeNull();
  fireEvent.mouseLeave(alert);
  fireEvent.click(screen.getByRole("button", { name: "Dismiss" }));
  expect(screen.queryByRole("alert")).toBeNull();
});

test("keeps at most four, newest last; without a provider, notifying does nothing", () => {
  setUp();
  for (let index = 0; index < 5; index++) fireEvent.click(screen.getByText("info"));
  expect(screen.getAllByRole("status")).toHaveLength(4);
  render(<Trigger />);
  fireEvent.click(screen.getAllByText("save")[1]!);
});

// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { Tip } from "@sharadox/interface-web-library/tip";

afterEach(cleanup);

test("shows its tip on hover, focus and tap, and hides it on Escape", () => {
  render(<Tip label="What's this?" text="Like a username." />);
  const button = screen.getByRole("button", { name: "What's this?" });
  const tip = screen.getByRole("tooltip", { hidden: true });
  expect(button.getAttribute("aria-describedby")).toBe(tip.id);
  expect(tip.hidden).toBe(true);
  fireEvent.mouseEnter(button.parentElement!);
  expect(tip.hidden).toBe(false);
  fireEvent.mouseLeave(button.parentElement!);
  expect(tip.hidden).toBe(true);
  fireEvent.focus(button);
  expect(tip.hidden).toBe(false);
  fireEvent.keyDown(button, { key: "Escape" });
  expect(tip.hidden).toBe(true);
  fireEvent.keyDown(button, { key: "a" });
  fireEvent.click(button);
  expect(tip.hidden).toBe(false);
  fireEvent.blur(button);
  expect(tip.hidden).toBe(true);
});

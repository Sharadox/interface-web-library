// @vitest-environment happy-dom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { SkeletonValue } from "@sharadox/interface-web-library/skeleton-value";

afterEach(cleanup);

test("an inline shape as wide as the awaited text, read aloud when labelled", () => {
  render(<SkeletonValue label="Loading your name…" width="12ch" />);
  const shape = screen.getByRole("status", { name: "Loading your name…" });
  expect(shape.style.width).toBe("12ch");
  expect(shape.tagName).toBe("SPAN");
});

test("silent without a label; a circle for a picture", () => {
  const { container } = render(<SkeletonValue circle={72} />);
  const shape = container.firstElementChild as HTMLElement;
  expect(shape.getAttribute("aria-hidden")).toBe("true");
  expect(shape.style.width).toBe("72px");
  expect(shape.style.height).toBe("72px");
  expect(shape.className).toContain("circle");
  cleanup();
  const { container: plain } = render(<SkeletonValue />);
  expect((plain.firstElementChild as HTMLElement).style.width).toBe("8ch");
});

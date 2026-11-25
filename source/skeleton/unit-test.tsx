// @vitest-environment happy-dom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { Skeleton } from "@sharadox/interface-web-library/skeleton";

afterEach(cleanup);

test("lines or a block, said once to screen readers", () => {
  const { rerender } = render(<Skeleton label="Loading devices…" lines={4} />);
  expect(screen.getByRole("status", { name: "Loading devices…" }).children).toHaveLength(4);
  rerender(<Skeleton label="Loading" />);
  expect(screen.getByRole("status").children).toHaveLength(3);
  rerender(<Skeleton label="Loading picture" height={120} />);
  const block = screen.getByRole("status").firstElementChild as HTMLElement;
  expect(block.style.height).toBe("120px");
});

test("shaped like what comes: a card, a list of rows, a profile, a grid of cards", () => {
  const { rerender, container } = render(<Skeleton label="Loading" shape="list" rows={3} />);
  expect(container.querySelectorAll("[data-part='row']")).toHaveLength(3);
  rerender(<Skeleton label="Loading" shape="card" lines={2} />);
  expect(container.querySelectorAll("[data-part='card'] [data-part='line']")).toHaveLength(2);
  rerender(<Skeleton label="Loading" shape="profile" />);
  expect(container.querySelector("[data-part='circle']")).toBeTruthy();
  rerender(<Skeleton label="Loading" shape="cards" rows={4} />);
  expect(container.querySelectorAll("[data-part='card']")).toHaveLength(4);
  rerender(<Skeleton label="Loading" shape="list" />);
  expect(container.querySelectorAll("[data-part='row']")).toHaveLength(3);
});

// @vitest-environment happy-dom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { Card } from "@sharadox/interface-web-library/card";

afterEach(cleanup);

test("a heading and description over its content; red for danger", () => {
  const { container, rerender } = render(
    <Card title="Emails" description="Where codes go." tone="danger">
      <p>Inside</p>
    </Card>,
  );
  expect(screen.getByRole("heading", { name: "Emails" })).toBeTruthy();
  expect(screen.getByText("Where codes go.")).toBeTruthy();
  expect(container.firstElementChild!.className).toContain("danger");
  rerender(<Card />);
  expect(container.firstElementChild!.children).toHaveLength(0);
});

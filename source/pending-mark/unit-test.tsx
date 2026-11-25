// @vitest-environment happy-dom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { PendingMark } from "@sharadox/interface-web-library/pending-mark";

afterEach(cleanup);

test("a spinner with what is happening, read out politely", () => {
  render(<PendingMark label="Saving…" />);
  expect(screen.getByRole("status").textContent).toBe("Saving…");
});

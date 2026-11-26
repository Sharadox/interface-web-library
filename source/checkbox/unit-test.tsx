// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { Checkbox } from "@sharadox/interface-web-library/checkbox";

afterEach(cleanup);

test("a real checkbox, named by its words, with a drawn box and a check mark once checked", () => {
  const change = vi.fn();
  const { container } = render(<Checkbox label="Email" name="email" onChange={change} className="extra" />);
  const box = screen.getByRole("checkbox", { name: "Email" }) as HTMLInputElement;
  expect(box.checked).toBe(false);
  expect(box.name).toBe("email");
  expect(container.firstElementChild!.className).toContain("extra");
  fireEvent.click(box);
  expect(box.checked).toBe(true);
  expect(change).toHaveBeenCalled();
  expect(container.querySelector("svg")).toBeTruthy();
});

// @vitest-environment happy-dom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { TextField } from "@sharadox/interface-web-library/text-field";

afterEach(cleanup);

test("the prefix and suffix are their own sections, never part of the value", () => {
  render(
    <TextField
      label="Identifier"
      name="identifier"
      defaultValue="ana"
      prefix="@"
      suffix=".example"
      tip={{ label: "What's this?", text: "Like a username." }}
      hint="Up to 50."
    />,
  );
  const input = screen.getByLabelText("Identifier") as HTMLInputElement;
  expect(input.value).toBe("ana");
  const group = input.parentElement!;
  expect([...group.children].map((child) => child.textContent)).toEqual(["@", "", ".example"]);
  expect(group.firstElementChild!.getAttribute("aria-hidden")).toBe("true");
  expect(input.getAttribute("aria-describedby")).toBe(`${input.id}-hint`);
  expect(screen.getByRole("button", { name: "What's this?" })).toBeTruthy();
  expect(input.getAttribute("aria-invalid")).toBeNull();
});

test("an error marks it invalid and is read with it", () => {
  render(<TextField id="name" label="Name" error="Too long." className="wide" />);
  const input = screen.getByLabelText("Name");
  expect(input.getAttribute("aria-invalid")).toBe("true");
  expect(input.getAttribute("aria-describedby")).toBe("name-error");
  expect(screen.getByRole("alert").textContent).toBe("Too long.");
  expect(input.parentElement!.children).toHaveLength(1);
});

test("with nothing to describe it, nothing is referenced", () => {
  render(<TextField label="City" />);
  expect(screen.getByLabelText("City").getAttribute("aria-describedby")).toBeNull();
});

// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { afterEach, expect, test, vi } from "vitest";
import { Select } from "@sharadox/interface-web-library/select";

afterEach(cleanup);

const MONTHS = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
];
const box = () => screen.getByRole("combobox", { name: "Month" });
const hidden = () => document.querySelector<HTMLInputElement>('input[type="hidden"][name="month"]')!;

test("a labelled button showing the choice or its placeholder; a click opens the list, a choice closes it", () => {
  const change = vi.fn();
  render(<Select label="Month" name="month" placeholder="Choose" options={MONTHS} onChange={change} />);
  expect(box().textContent).toBe("Choose");
  expect(box().getAttribute("aria-expanded")).toBe("false");
  expect(screen.queryByRole("listbox")).toBeNull();
  expect(hidden().value).toBe("");
  fireEvent.click(box());
  expect(box().getAttribute("aria-expanded")).toBe("true");
  const list = screen.getByRole("listbox", { name: "Month" });
  expect(box().getAttribute("aria-controls")).toBe(list.id);
  fireEvent.click(screen.getByRole("option", { name: "March" }));
  expect(change).toHaveBeenCalledWith("3");
  expect(box().textContent).toBe("March");
  expect(hidden().value).toBe("3");
  expect(screen.queryByRole("listbox")).toBeNull();
  fireEvent.click(box());
  expect(screen.getByRole("option", { name: "March" }).getAttribute("aria-selected")).toBe("true");
  fireEvent.click(box());
  expect(screen.queryByRole("listbox")).toBeNull();
});

test("the keyboard: arrows open and move, Home and End, Enter or Space choose, Escape closes, letters jump", () => {
  render(<Select label="Month" name="month" defaultValue="2" options={MONTHS} />);
  const active = () => document.getElementById(box().getAttribute("aria-activedescendant") ?? "")?.textContent;
  fireEvent.keyDown(box(), { key: "ArrowDown" });
  expect(active()).toBe("February");
  fireEvent.keyDown(box(), { key: "ArrowDown" });
  expect(active()).toBe("March");
  fireEvent.keyDown(box(), { key: "ArrowUp" });
  expect(active()).toBe("February");
  fireEvent.keyDown(box(), { key: "End" });
  expect(active()).toBe("July");
  fireEvent.keyDown(box(), { key: "ArrowDown" });
  expect(active()).toBe("July");
  fireEvent.keyDown(box(), { key: "Home" });
  expect(active()).toBe("January");
  fireEvent.keyDown(box(), { key: "ArrowUp" });
  expect(active()).toBe("January");
  fireEvent.keyDown(box(), { key: "j" });
  expect(active()).toBe("June");
  fireEvent.keyDown(box(), { key: "j" });
  expect(active()).toBe("July");
  fireEvent.keyDown(box(), { key: "Enter" });
  expect(hidden().value).toBe("7");
  expect(box().getAttribute("aria-expanded")).toBe("false");
  fireEvent.keyDown(box(), { key: " " });
  expect(box().getAttribute("aria-expanded")).toBe("true");
  fireEvent.keyDown(box(), { key: "ArrowUp" });
  fireEvent.keyDown(box(), { key: " " });
  expect(hidden().value).toBe("6");
  fireEvent.keyDown(box(), { key: "ArrowUp" });
  expect(box().getAttribute("aria-expanded")).toBe("true");
  fireEvent.keyDown(box(), { key: "Shift" });
  fireEvent.keyDown(box(), { key: "Escape" });
  expect(box().getAttribute("aria-expanded")).toBe("false");
  expect(hidden().value).toBe("6");
  // Closed, a letter chooses straight away, as a native select does; an unknown letter does nothing.
  fireEvent.keyDown(box(), { key: "f" });
  expect(hidden().value).toBe("2");
  fireEvent.keyDown(box(), { key: "z" });
  fireEvent.keyDown(box(), { key: "Shift" });
  expect(hidden().value).toBe("2");
});

test("Tab chooses the highlighted option and moves on; a click outside closes without choosing", () => {
  render(<Select label="Month" name="month" options={MONTHS} />);
  fireEvent.keyDown(box(), { key: "Enter" });
  fireEvent.keyDown(box(), { key: "ArrowDown" });
  fireEvent.keyDown(box(), { key: "Tab" });
  expect(hidden().value).toBe("2");
  fireEvent.click(box());
  fireEvent.pointerDown(screen.getByRole("listbox"));
  expect(screen.getByRole("listbox")).toBeTruthy();
  fireEvent.pointerDown(document.body);
  expect(screen.queryByRole("listbox")).toBeNull();
  expect(hidden().value).toBe("2");
  // Tab while closed does nothing.
  fireEvent.keyDown(box(), { key: "Tab" });
  expect(hidden().value).toBe("2");
});

test("kept by its parent: shows the parent's value; disabled can't open", () => {
  function Kept() {
    const [month, setMonth] = useState("6");
    return (
      <>
        <Select label="Month" options={MONTHS} value={month} onChange={setMonth} id="month" className="extra" />
        <output>{month}</output>
      </>
    );
  }
  const { container } = render(<Kept />);
  expect(box().textContent).toBe("June");
  expect(box().id).toBe("month");
  expect(container.firstElementChild!.className).toContain("extra");
  expect(document.querySelector('input[type="hidden"]')).toBeNull();
  fireEvent.click(box());
  fireEvent.click(screen.getByRole("option", { name: "January" }));
  expect(screen.getByText("1", { selector: "output" })).toBeTruthy();
  cleanup();
  render(<Select label="Month" options={MONTHS} disabled />);
  fireEvent.click(box());
  fireEvent.keyDown(box(), { key: "ArrowDown" });
  expect(screen.queryByRole("listbox")).toBeNull();
});

test("hovering an option highlights it", () => {
  render(<Select label="Month" options={MONTHS} />);
  fireEvent.click(box());
  fireEvent.pointerMove(screen.getByRole("option", { name: "July" }));
  expect(screen.getByRole("option", { name: "July" }).dataset.active).toBe("");
});

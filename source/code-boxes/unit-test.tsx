// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { CodeBoxes } from "@sharadox/interface-web-library/code-boxes";

afterEach(cleanup);

const boxes = () => screen.getAllByRole("textbox") as HTMLInputElement[];
const hidden = () => document.querySelector<HTMLInputElement>('input[type="hidden"][name="code"]')!;

test("one box per digit, each moving on to the next, the whole code in one hidden field", () => {
  const complete = vi.fn();
  render(<CodeBoxes label="Code" digitLabel="digit" ofLabel="of" name="code" onComplete={complete} autoFocus />);
  expect(boxes()).toHaveLength(6);
  expect(screen.getByRole("group", { name: "Code" })).toBeTruthy();
  expect(boxes()[0]!.getAttribute("aria-label")).toBe("Code, digit 1 of 6");
  expect(boxes()[0]!.getAttribute("autocomplete")).toBe("one-time-code");
  expect(boxes()[1]!.getAttribute("autocomplete")).toBe("off");
  expect(document.activeElement).toBe(boxes()[0]);
  for (const [index, digit] of ["1", "2", "3", "4", "5"].entries()) {
    fireEvent.change(boxes()[index]!, { target: { value: digit } });
    expect(document.activeElement).toBe(boxes()[index + 1]);
  }
  expect(complete).not.toHaveBeenCalled();
  fireEvent.change(boxes()[5]!, { target: { value: "6" } });
  expect(hidden().value).toBe("123456");
  expect(complete).toHaveBeenCalledWith("123456");
});

test("pasting or autofilling the whole code fills every box, ignoring what isn't a digit", () => {
  const complete = vi.fn();
  render(<CodeBoxes label="Code" digitLabel="digit" ofLabel="of" name="code" onComplete={complete} />);
  fireEvent.paste(boxes()[0]!, { clipboardData: { getData: () => "Code: 123 456" } });
  expect(boxes().map(({ value }) => value)).toEqual(["1", "2", "3", "4", "5", "6"]);
  expect(complete).toHaveBeenCalledWith("123456");
  // Phones put a one-time code from a message into the first box all at once.
  fireEvent.change(boxes()[0]!, { target: { value: "987654" } });
  expect(hidden().value).toBe("987654");
});

test("letters are ignored, and backspace and arrows move between boxes", () => {
  render(<CodeBoxes label="Code" digitLabel="digit" ofLabel="of" name="code" />);
  fireEvent.change(boxes()[0]!, { target: { value: "a" } });
  expect(boxes()[0]!.value).toBe("");
  fireEvent.change(boxes()[0]!, { target: { value: "4" } });
  fireEvent.change(boxes()[1]!, { target: { value: "2" } });
  boxes()[2]!.focus();
  fireEvent.keyDown(boxes()[2]!, { key: "Backspace" });
  expect(document.activeElement).toBe(boxes()[1]);
  expect(boxes()[1]!.value).toBe("");
  fireEvent.keyDown(boxes()[1]!, { key: "ArrowLeft" });
  expect(document.activeElement).toBe(boxes()[0]);
  fireEvent.keyDown(boxes()[0]!, { key: "ArrowRight" });
  expect(document.activeElement).toBe(boxes()[1]);
  fireEvent.keyDown(boxes()[0]!, { key: "ArrowLeft" });
  fireEvent.keyDown(boxes()[5]!, { key: "ArrowRight" });
  // Backspace on the filled first box clears it; again, on the empty first box, stays there.
  fireEvent.keyDown(boxes()[0]!, { key: "Backspace" });
  expect(boxes()[0]!.value).toBe("");
  fireEvent.keyDown(boxes()[0]!, { key: "Backspace" });
  expect(document.activeElement).toBe(boxes()[0]);
  fireEvent.keyDown(boxes()[1]!, { key: "x" });
  fireEvent.change(boxes()[0]!, { target: { value: "4" } });
  // Typing over a filled box replaces its digit.
  fireEvent.change(boxes()[0]!, { target: { value: "47" } });
  expect(boxes()[0]!.value).toBe("7");
  expect(hidden().value).toBe("7");
});

test("marks the boxes invalid and points them at the error", () => {
  render(<CodeBoxes label="Code" digitLabel="digit" ofLabel="of" name="code" length={4} invalid describedBy="error" />);
  expect(boxes()).toHaveLength(4);
  expect(boxes().every((box) => box.getAttribute("aria-invalid") === "true")).toBe(true);
  expect(boxes()[0]!.getAttribute("aria-describedby")).toBe("error");
});

test("reads each box's position in the visitor's language", () => {
  render(<CodeBoxes label="Código" digitLabel="algarismo" ofLabel="de" name="code" />);
  expect(boxes()[2]!.getAttribute("aria-label")).toBe("Código, algarismo 3 de 6");
});

test("without a name there is no hidden field; disabled boxes can't be typed in", () => {
  render(<CodeBoxes label="Code" digitLabel="digit" ofLabel="of" disabled />);
  expect(document.querySelector('input[type="hidden"]')).toBeNull();
  expect((screen.getAllByRole("textbox")[0] as HTMLInputElement).disabled).toBe(true);
});

test("Backspace or Delete on a filled box clears that box and stays on it", () => {
  render(<CodeBoxes label="Code" digitLabel="digit" ofLabel="of" name="code" />);
  fireEvent.paste(boxes()[0]!, { clipboardData: { getData: () => "123456" } });
  boxes()[2]!.focus();
  fireEvent.keyDown(boxes()[2]!, { key: "Backspace" });
  expect(boxes()[2]!.value).toBe("");
  expect(document.activeElement).toBe(boxes()[2]);
  fireEvent.keyDown(boxes()[4]!, { key: "Delete" });
  expect(boxes()[4]!.value).toBe("");
  fireEvent.keyDown(boxes()[4]!, { key: "Delete" });
  expect(hidden().value).toBe("1246");
  expect(boxes().map(({ value }) => value)).toEqual(["1", "2", "", "4", "", "6"]);
});

test("a box typed into after one is cleared fills just that box", () => {
  const complete = vi.fn();
  render(<CodeBoxes label="Code" digitLabel="digit" ofLabel="of" name="code" onComplete={complete} />);
  fireEvent.paste(boxes()[0]!, { clipboardData: { getData: () => "123456" } });
  fireEvent.keyDown(boxes()[2]!, { key: "Backspace" });
  fireEvent.change(boxes()[2]!, { target: { value: "9" } });
  expect(boxes().map(({ value }) => value)).toEqual(["1", "2", "9", "4", "5", "6"]);
  expect(complete).toHaveBeenLastCalledWith("129456");
});

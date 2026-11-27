// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { Button } from "@sharadox/interface-web-library/button";

afterEach(cleanup);

test("a button with its look and icon, that clicks", () => {
  const click = vi.fn();
  render(
    <Button look="secondary" icon="plus" onClick={click} className="extra">
      Add
    </Button>,
  );
  const button = screen.getByRole("button", { name: "Add" });
  expect(button.getAttribute("type")).toBe("button");
  expect(button.className).toContain("extra");
  expect(button.querySelector("svg")).not.toBeNull();
  fireEvent.click(button);
  expect(click).toHaveBeenCalledOnce();
});

test("while pending: a spinner, its pending words, busy, and no clicks", () => {
  const click = vi.fn();
  const { rerender } = render(
    <Button type="submit" pending pendingLabel="Saving…" onClick={click}>
      Save
    </Button>,
  );
  const button = screen.getByRole("button", { name: "Saving…" });
  expect(button.getAttribute("aria-busy")).toBe("true");
  expect((button as HTMLButtonElement).disabled).toBe(true);
  fireEvent.click(button);
  expect(click).not.toHaveBeenCalled();
  rerender(
    <Button pending look="danger">
      Delete
    </Button>,
  );
  expect(screen.getByRole("button", { name: "Delete" }).getAttribute("aria-busy")).toBe("true");
});

test("each look is its own class: primary (filled), secondary (outlined), plain (text), danger", () => {
  for (const look of ["primary", "secondary", "plain", "danger"] as const) {
    render(<Button look={look}>{look}</Button>);
    expect(screen.getByRole("button", { name: look }).className).toContain(look);
  }
});

test("a link that looks like a button, its arrow sliding on hover; another link component, a new tab", () => {
  const { rerender } = render(<Button href="/en/booking">Book a Visit</Button>);
  const link = screen.getByRole("link", { name: "Book a Visit" });
  expect(link.getAttribute("href")).toBe("/en/booking");
  expect(link.className).toContain("primary");
  expect(link.querySelector("[data-arrow]")).not.toBeNull();
  function Glide({
    href,
    className,
    children,
    ...rest
  }: {
    href: string;
    className?: string;
    children: React.ReactNode;
  }) {
    return (
      <a href={href} className={className} data-glide="" {...rest}>
        {children}
      </a>
    );
  }
  rerender(
    <Button
      href="https://maps.example"
      link={Glide}
      target="_blank"
      rel="noopener noreferrer"
      look="secondary"
      arrow={false}
    >
      Directions
    </Button>,
  );
  const away = screen.getByRole("link", { name: "Directions" });
  expect(away.hasAttribute("data-glide")).toBe(true);
  expect(away.getAttribute("target")).toBe("_blank");
  expect(away.getAttribute("rel")).toBe("noopener noreferrer");
  expect(away.className).toContain("secondary");
  expect(away.querySelector("[data-arrow]")).toBeNull();
});

test("a button shows the arrow only when asked", () => {
  const { rerender } = render(<Button>Save</Button>);
  expect(screen.getByRole("button", { name: "Save" }).querySelector("[data-arrow]")).toBeNull();
  rerender(<Button arrow>Send</Button>);
  expect(screen.getByRole("button", { name: "Send" }).querySelector("[data-arrow]")).not.toBeNull();
});

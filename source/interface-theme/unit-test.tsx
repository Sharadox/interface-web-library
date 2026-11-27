// @vitest-environment happy-dom
import { cleanup, render } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { InterfaceTheme, interfaceThemeStyle } from "@sharadox/interface-web-library/interface-theme";

afterEach(cleanup);

test("turns a theme into custom properties on one wrapper", () => {
  expect(interfaceThemeStyle({ surfaceRaised: "#111", barHeight: "72px" })).toEqual({
    "--interface-surface-raised": "#111",
    "--interface-bar-height": "72px",
  });
  const { container } = render(
    <InterfaceTheme theme={{ accent: "gold" }} className="frame">
      <p>Inside</p>
    </InterfaceTheme>,
  );
  const wrapper = container.firstElementChild as HTMLElement;
  expect(wrapper.className).toBe("frame");
  expect(wrapper.style.getPropertyValue("--interface-accent")).toBe("gold");
  expect(wrapper.textContent).toBe("Inside");
});

test("buttons and cards wear the company's look too", () => {
  expect(
    interfaceThemeStyle({
      buttonRadius: "999px",
      buttonCase: "uppercase",
      primaryBackground: "linear-gradient(gold, gold)",
      secondaryEdge: "gold",
      plainUnderline: "linear-gradient(gold, gold)",
      cardBackground: "#060606",
      cardEdge: "gold",
      cardLight: "rgb(255 215 0 / 9%)",
    }),
  ).toEqual({
    "--interface-button-radius": "999px",
    "--interface-button-case": "uppercase",
    "--interface-primary-background": "linear-gradient(gold, gold)",
    "--interface-secondary-edge": "gold",
    "--interface-plain-underline": "linear-gradient(gold, gold)",
    "--interface-card-background": "#060606",
    "--interface-card-edge": "gold",
    "--interface-card-light": "rgb(255 215 0 / 9%)",
  });
});

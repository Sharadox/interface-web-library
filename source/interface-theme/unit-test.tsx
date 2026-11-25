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

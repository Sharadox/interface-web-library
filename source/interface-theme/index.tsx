import type { CSSProperties } from "react";
import type {
  InterfaceThemeProperties,
  InterfaceThemeValues,
} from "@sharadox/interface-web-library/interface-theme/type";

/** `surfaceRaised` → `--interface-surface-raised`. */
const property = (key: string) => `--interface-${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`;

/**
 * The custom properties that dress the interface in a company's look.
 *
 * @example
 * interfaceThemeStyle({ accent: "var(--gold)" }); // { "--interface-accent": "var(--gold)" }
 */
export function interfaceThemeStyle(theme: Partial<InterfaceThemeValues>): CSSProperties {
  return Object.fromEntries(Object.entries(theme).map(([key, value]) => [property(key), value])) as CSSProperties;
}

/**
 * Wraps the interface in a company's look (colors, corners, fonts), with no global stylesheet: the values sit
 * on this element as custom properties, which every piece of this library reads.
 *
 * @example
 * <InterfaceTheme theme={{ accent: "var(--gold)", font: "var(--font-body)" }}>{children}</InterfaceTheme>
 */
export function InterfaceTheme({ theme, children, className }: InterfaceThemeProperties) {
  return (
    <div className={className} style={interfaceThemeStyle(theme)}>
      {children}
    </div>
  );
}

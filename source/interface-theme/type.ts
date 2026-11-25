import type { ReactNode } from "react";

/** A company's look for the interface ; anything left out keeps its plain default. */
export interface InterfaceThemeValues {
  background: string;
  /** Behind cards and panels. */
  surface: string;
  /** Cards, menus, dialogs. */
  surfaceRaised: string;
  text: string;
  /** Labels, hints, secondary text. */
  textSoft: string;
  line: string;
  /** Buttons, links, focus rings, selection. */
  accent: string;
  /** Text on the accent. */
  accentText: string;
  danger: string;
  success: string;
  radius: string;
  smallRadius: string;
  font: string;
  /** Headings. */
  fontDisplay: string;
  /** The height of the site's fixed bar: notifications sit just below it. */
  barHeight: string;
  shadow: string;
  /** Inside a field. */
  fieldBackground: string;
  fieldBorder: string;
  fieldHeight: string;
  /** The ring around a field being typed in (a box-shadow). */
  fieldFocus: string;
  /** Field labels: their size, letter spacing and case (`uppercase`). */
  labelSize: string;
  labelSpacing: string;
  labelCase: string;
}

export interface InterfaceThemeProperties {
  theme: Partial<InterfaceThemeValues>;
  children: ReactNode;
  className?: string;
}

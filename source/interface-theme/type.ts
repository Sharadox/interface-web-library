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
  /** Buttons: corners, height, padding, the gap between icon, words and arrow, size, weight, letter spacing, case. */
  buttonRadius: string;
  buttonHeight: string;
  buttonPadding: string;
  buttonGap: string;
  buttonSize: string;
  buttonWeight: string;
  buttonSpacing: string;
  buttonCase: string;
  /** The primary (filled) button: its background (a color or gradient), words, shadow and shadow on hover. */
  primaryBackground: string;
  primaryText: string;
  primaryShadow: string;
  primaryShadowHover: string;
  /** A light that crosses the primary button on hover (an image, such as a gradient). */
  primaryGlint: string;
  /** The secondary (outlined) button: its edge, and its edge and words on hover. */
  secondaryEdge: string;
  secondaryEdgeHover: string;
  secondaryTextHover: string;
  /** A line under plain buttons that grows on hover (an image, such as a gradient). */
  plainUnderline: string;
  /** Cards: corners, padding, surface (a color or gradient) and edge (an image, such as a gradient). */
  cardRadius: string;
  cardPadding: string;
  cardBackground: string;
  cardEdge: string;
  /** The pointer's light on a card's surface and on its edge (colors). */
  cardLight: string;
  cardEdgeLight: string;
}

export interface InterfaceThemeProperties {
  theme: Partial<InterfaceThemeValues>;
  children: ReactNode;
  className?: string;
}

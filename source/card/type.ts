import type { ReactNode } from "react";

export interface CardProperties {
  title?: string;
  description?: ReactNode;
  /** `danger`: for what can't be undone. */
  tone?: "danger";
  /** A button beside the content (Edit, Add, Remove), centered on the card's height. */
  action?: ReactNode;
  children?: ReactNode;
}

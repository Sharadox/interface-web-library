import type { ReactNode } from "react";

export interface CardProperties {
  title?: string;
  description?: ReactNode;
  /** `danger`: for what can't be undone. */
  tone?: "danger";
  children?: ReactNode;
}

import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { IconName } from "@sharadox/icon-web-library/icon/type";

export interface ButtonProperties extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** `primary` (the accent), `quiet` (outlined), `danger`, or `plain` (text only). */
  look?: "primary" | "quiet" | "danger" | "plain";
  /** Shows a spinner and stops clicks while an action runs; `pendingLabel` replaces the text. */
  pending?: boolean;
  pendingLabel?: string;
  icon?: IconName;
  children: ReactNode;
}

import type { ReactNode } from "react";

/** A notification after an action: `success` and `info` are polite, `error` is an alert. */
export interface Toast {
  id: number;
  message: string;
  tone: "success" | "info" | "error";
}

export interface ToastContextValue {
  /** Shows a notification for a few seconds (`error`s stay twice as long). */
  notify(message: string, tone?: Toast["tone"]): void;
}

export interface ToastProviderProperties {
  /** The region's name and the close buttons' ("Notifications", "Dismiss"). */
  label: string;
  dismissLabel: string;
  /** How long a notification stays, in milliseconds (5 seconds by default). */
  duration?: number;
  children: ReactNode;
}

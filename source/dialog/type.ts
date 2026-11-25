import type { ReactNode } from "react";

export interface DialogProperties {
  open: boolean;
  /** Escape, the close button or a click on the backdrop. */
  onClose: () => void;
  title: string;
  /** The close button's name ("Close"). */
  closeLabel: string;
  children: ReactNode;
}

import type { InputHTMLAttributes, ReactNode } from "react";

export interface CheckboxProperties extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Its words, beside the box. */
  label: ReactNode;
}

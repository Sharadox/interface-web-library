import type { InputHTMLAttributes, ReactNode } from "react";

export interface TextFieldProperties extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  label: string;
  /** A tip beside the label (a question mark), with the words of its button. */
  tip?: { text: string; label: string };
  /** A fixed part before the typing, its own section of the field ("@"): never part of the value. */
  prefix?: ReactNode;
  /** A fixed part after the typing ("@example.com", a unit, a button). */
  suffix?: ReactNode;
  /** A line under the field. */
  hint?: string;
  /** What's wrong with the value; marks the field invalid. */
  error?: string | null;
}

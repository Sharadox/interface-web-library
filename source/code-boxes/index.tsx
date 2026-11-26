"use client";
import { useRef, useState, type ClipboardEvent, type KeyboardEvent } from "react";
import styles from "./index.module.scss";
import type { CodeBoxesProperties } from "@sharadox/interface-web-library/code-boxes/type";

/**
 * A one-time code typed into one box per digit: each digit moves on to the next box, Backspace or Delete clears the
 * box it is on (on an empty box, Backspace clears the one before), the arrows move back and forth, and pasting the code (or the phone filling it in from a message) fills every box at once. The whole
 * code is in one hidden field for forms; `onComplete` fires once every box has its digit.
 *
 * @example
 * <CodeBoxes label="Code" digitLabel="digit" ofLabel="of" onComplete={submit} autoFocus />
 */
export function CodeBoxes({
  label,
  digitLabel,
  ofLabel,
  name,
  length = 6,
  onComplete,
  invalid,
  disabled,
  describedBy,
  autoFocus,
}: CodeBoxesProperties) {
  const [digits, setDigits] = useState<string[]>(() => Array.from({ length }, () => ""));
  const boxes = useRef<(HTMLInputElement | null)[]>([]);
  const focus = (index: number) => boxes.current[Math.max(0, Math.min(length - 1, index))]?.focus();

  /** Puts `typed` digits from box `from` on, then moves to the next empty box. */
  const fill = (from: number, typed: string) => {
    const next = [...digits];
    let at = from;
    for (const digit of typed.replace(/\D/g, "").slice(0, length - from)) next[at++] = digit;
    setDigits(next);
    focus(at);
    const code = next.join("");
    if (code.length === length) onComplete?.(code);
  };

  const change = (index: number, value: string) => {
    const typed = value.replace(/\D/g, "");
    if (!typed) return;
    // One new digit typed over an old one: keep the new one (the last typed).
    fill(index, typed.length === 2 && digits[index] ? typed.slice(-1) : typed);
  };

  /** Empties box `index`. */
  const clear = (index: number) => setDigits(digits.map((digit, at) => (at === index ? "" : digit)));

  const keyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if ((event.key === "Backspace" || event.key === "Delete") && digits[index]) {
      // A filled box: clear it, wherever it is, and stay on it.
      event.preventDefault();
      clear(index);
    } else if (event.key === "Backspace") {
      // An empty box: clear the one before and go back to it.
      event.preventDefault();
      clear(Math.max(0, index - 1));
      focus(index - 1);
    } else if (event.key === "ArrowLeft") focus(index - 1);
    else if (event.key === "ArrowRight") focus(index + 1);
  };

  const paste = (index: number, event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    fill(index, event.clipboardData.getData("text"));
  };

  return (
    <div role="group" aria-label={label} className={styles.boxes}>
      {name && <input type="hidden" name={name} value={digits.join("")} />}
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(element) => {
            boxes.current[index] = element;
          }}
          className={styles.box}
          value={digit}
          onChange={(event) => change(index, event.target.value)}
          onKeyDown={(event) => keyDown(index, event)}
          onPaste={(event) => paste(index, event)}
          onFocus={(event) => event.target.select()}
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          aria-label={`${label}, ${digitLabel} ${index + 1} ${ofLabel} ${length}`}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          disabled={disabled}
          autoFocus={autoFocus && index === 0}
        />
      ))}
    </div>
  );
}

"use client";
import { useId, useState } from "react";
import { Icon } from "@sharadox/icon-web-library/icon";
import styles from "./index.module.scss";
import type { TipProperties } from "@sharadox/interface-web-library/tip/type";

/**
 * A small question mark beside a label that shows a tip on hover, on keyboard focus, or on a tap (phones). Escape
 * hides it. The button is described by the tip, so screen readers hear it too.
 *
 * @example
 * <label>Identifier <Tip label="What's this?" text="Like a username…" /></label>
 */
export function Tip({ text, label }: TipProperties) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <span className={styles.tip} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        className={styles.button}
        aria-label={label}
        aria-describedby={id}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false);
        }}
      >
        <Icon name="question" />
      </button>
      <span id={id} role="tooltip" className={styles.bubble} hidden={!open}>
        {text}
      </span>
    </span>
  );
}

"use client";
import { useState } from "react";
import styles from "./index.module.scss";
import type { SwitchProperties } from "@sharadox/interface-web-library/switch/type";

/**
 * An on/off switch (a button with the switch role, read as on or off). It flips the moment it's pressed, with a loader
 * on its knob while the change runs, and flips back if the change fails (`onChange` answering false).
 *
 * @example
 * <Switch label="Required at every sign-in" checked={required} onChange={(on) => save(on)} />
 */
export function Switch({ label, checked, onChange, disabled }: SwitchProperties) {
  const [pending, setPending] = useState(false);
  // The value it was flipped to, kept until the page's own value changes (then that one is shown).
  const [flipped, setFlipped] = useState<{ value: boolean; from: boolean } | null>(null);
  const shown = flipped && flipped.from === checked ? flipped.value : checked;
  return (
    <button
      type="button"
      role="switch"
      aria-checked={shown}
      aria-busy={pending || undefined}
      className={styles.switch}
      disabled={disabled || pending}
      onClick={async () => {
        const before = flipped;
        setFlipped({ value: !shown, from: checked });
        setPending(true);
        const applied = await onChange(!shown);
        setPending(false);
        // Failed: back to what it showed before.
        if (applied === false) setFlipped(before);
      }}
    >
      <span className={styles.track} aria-hidden="true">
        <span className={styles.thumb} />
      </span>
      <span>{label}</span>
    </button>
  );
}

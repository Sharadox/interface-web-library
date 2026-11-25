"use client";
import { useEffect, useState } from "react";
import { Icon } from "@sharadox/icon-web-library/icon";
import styles from "./index.module.scss";
import type { CopyButtonProperties } from "@sharadox/interface-web-library/copy-button/type";

/**
 * Copies a value to the clipboard (a key, a set of recovery codes) and says so for two seconds, with a tick.
 *
 * @example
 * <CopyButton value={secret} label="Copy" copiedLabel="Copied." />
 */
export function CopyButton({ value, label, copiedLabel, onCopied }: CopyButtonProperties) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);
  return (
    <button
      type="button"
      className={styles.button}
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        onCopied?.();
      }}
    >
      <Icon name={copied ? "check" : "copy"} />
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}

import styles from "./index.module.scss";
import type { PendingMarkProperties } from "@sharadox/interface-web-library/pending-mark/type";

/**
 * A small spinner with what is happening ("Saving…"), beside a value already shown as it will be: the change is on
 * its way. Read out politely by screen readers.
 *
 * @example
 * <span>{name} <PendingMark label="Saving…" /></span>
 */
export function PendingMark({ label }: PendingMarkProperties) {
  return (
    <span className={styles.mark} role="status">
      <span className={styles.spinner} aria-hidden="true" />
      {label}
    </span>
  );
}

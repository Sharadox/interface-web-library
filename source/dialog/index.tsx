"use client";
import { useEffect, useId, useRef } from "react";
import { Icon } from "@sharadox/icon-web-library/icon";
import styles from "./index.module.scss";
import type { DialogProperties } from "@sharadox/interface-web-library/dialog/type";

/**
 * A pop-up over the page (the browser's own modal dialog: focus stays inside, the page behind is inert), named by its
 * title, closed by Escape, its close button or a click on the backdrop.
 *
 * @example
 * <Dialog open={asking} onClose={() => setAsking(false)} title="Check your email" closeLabel="Close">…</Dialog>
 */
export function Dialog({ open, onClose, title, closeLabel, children }: DialogProperties) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const element = dialog.current!;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
  }, [open]);
  return (
    <dialog
      ref={dialog}
      className={styles.dialog}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialog.current) onClose();
      }}
    >
      {open && (
        <div className={styles.inside}>
          <header className={styles.header}>
            <h2 id={titleId} className={styles.title}>
              {title}
            </h2>
            <button type="button" className={styles.close} aria-label={closeLabel} onClick={onClose}>
              <Icon name="close" />
            </button>
          </header>
          {children}
        </div>
      )}
    </dialog>
  );
}

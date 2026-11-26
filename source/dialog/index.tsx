"use client";
import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@sharadox/icon-web-library/icon";
import styles from "./index.module.scss";
import type { DialogProperties } from "@sharadox/interface-web-library/dialog/type";

/** The longest a leaving animation may take before the dialog closes anyway (reduced motion runs none). */
const LEAVING_MILLISECONDS = 300;

/**
 * A pop-up over the page (the browser's own modal dialog: focus stays inside, the page behind is inert), named by its
 * title, closed by Escape, its close button or a click on the backdrop. It leaves the way it came: the opening
 * animation runs backwards before it closes, no longer modal meanwhile, so the page behind works at once.
 *
 * @example
 * <Dialog open={asking} onClose={() => setAsking(false)} title="Check Your Email" closeLabel="Close">…</Dialog>
 */
export function Dialog({ open, onClose, title, closeLabel, children }: DialogProperties) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  // Leaving: closed by the parent but still on screen while its animation runs backwards.
  const [leaving, setLeaving] = useState(false);
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    setLeaving(!open);
  }
  const finish = () => {
    dialog.current!.close();
    setLeaving(false);
  };
  useEffect(() => {
    const element = dialog.current!;
    if (open && !element.open) element.showModal();
    if (!leaving) return;
    // Leaving, it stops being modal at once, so the page behind works straight away (a field can be typed in);
    // it only stays on screen for its animation.
    element.close();
    element.show();
    const timer = setTimeout(finish, LEAVING_MILLISECONDS);
    return () => clearTimeout(timer);
  }, [open, leaving]);
  return (
    <dialog
      ref={dialog}
      className={styles.dialog}
      aria-labelledby={titleId}
      data-closing={leaving ? "" : undefined}
      onAnimationEnd={(event) => {
        if (event.target === dialog.current && leaving) finish();
      }}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialog.current) onClose();
      }}
    >
      {(open || leaving) && (
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

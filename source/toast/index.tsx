"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@sharadox/icon-web-library/icon";
import { classNames } from "@sharadox/web-library/class-name";
import styles from "./index.module.scss";
import type { Toast, ToastContextValue, ToastProviderProperties } from "@sharadox/interface-web-library/toast/type";

const ToastContext = createContext<ToastContextValue>({ notify: () => {} });

/**
 * The notifications shown after each action, from anywhere under `ToastProvider`.
 *
 * @example
 * const { notify } = useToast();
 * notify("Saved.");
 */
export function useToast(): ToastContextValue {
  return useContext(ToastContext);
}

/** One notification: hides itself after `duration` (not while the pointer is on it), or with its close button. */
function ToastItem({
  toast,
  duration,
  dismissLabel,
  onDismiss,
}: {
  toast: Toast;
  duration: number;
  dismissLabel: string;
  onDismiss: (id: number) => void;
}) {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => onDismiss(toast.id), toast.tone === "error" ? duration * 2 : duration);
    return () => clearTimeout(timer);
  }, [paused, toast, duration, onDismiss]);
  return (
    <div
      className={classNames(styles.toast, styles[toast.tone])}
      role={toast.tone === "error" ? "alert" : "status"}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Icon name={toast.tone === "error" ? "warning" : "check"} />
      <p>{toast.message}</p>
      <button type="button" className={styles.close} aria-label={dismissLabel} onClick={() => onDismiss(toast.id)}>
        <Icon name="close" />
      </button>
    </div>
  );
}

/**
 * Shows a notification after every action, at the top right just below the site's bar (inside the page, under the
 * profile picture): it goes after a few seconds, or when closed. At most four at once, newest last.
 *
 * @example
 * <ToastProvider label="Notifications" dismissLabel="Dismiss">{children}</ToastProvider>
 */
export function ToastProvider({ label, dismissLabel, duration = 5000, children }: ToastProviderProperties) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const next = useRef(0);
  const dismiss = useCallback((id: number) => setToasts((all) => all.filter((toast) => toast.id !== id)), []);
  const value = useMemo<ToastContextValue>(
    () => ({
      notify: (message, tone = "success") =>
        setToasts((all) => [...all, { id: ++next.current, message, tone }].slice(-4)),
    }),
    [],
  );
  return (
    <ToastContext.Provider value={value}>
      {children}
      <section className={styles.region} aria-label={label}>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} duration={duration} dismissLabel={dismissLabel} onDismiss={dismiss} />
        ))}
      </section>
    </ToastContext.Provider>
  );
}

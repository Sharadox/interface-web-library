"use client";
import { useId } from "react";
import { classNames } from "@sharadox/web-library/class-name";
import { Tip } from "@sharadox/interface-web-library/tip";
import styles from "./index.module.scss";
import type { TextFieldProperties } from "@sharadox/interface-web-library/text-field/type";

/**
 * A labelled text field whose prefix and suffix are sections of their own, side by side with the typing area, so long
 * values never run under them: `[@][identifier…][suffix]`. With a tip beside the label, a hint and an error below,
 * all tied to the input for screen readers.
 *
 * @example
 * <TextField label="Identifier" prefix="@" name="identifier" tip={{ label: "What's this?", text: "…" }} />
 */
export function TextField({ label, tip, prefix, suffix, hint, error, className, id, ...input }: TextFieldProperties) {
  const generated = useId();
  const inputId = id ?? generated;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div className={classNames(styles.field, className)}>
      <span className={styles.label}>
        <label htmlFor={inputId}>{label}</label>
        {tip && <Tip text={tip.text} label={tip.label} />}
      </span>
      <span className={classNames(styles.group, error && styles.invalid)}>
        {prefix && (
          <span className={styles.prefix} aria-hidden="true">
            {prefix}
          </span>
        )}
        <input
          {...input}
          id={inputId}
          className={styles.input}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
        />
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </span>
      {hint && (
        <span id={hintId} className={styles.hint}>
          {hint}
        </span>
      )}
      {error && (
        <span id={errorId} className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

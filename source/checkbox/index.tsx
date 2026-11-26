import { Icon } from "@sharadox/icon-web-library/icon";
import { classNames } from "@sharadox/web-library/class-name";
import styles from "./index.module.scss";
import type { CheckboxProperties } from "@sharadox/interface-web-library/checkbox/type";

/**
 * A checkbox drawn like the buttons: unchecked, outlined like a secondary button; checked, filled like a primary
 * one, with a check mark. The browser's own checkbox stays underneath, so forms, keyboards and screen readers work
 * as usual.
 *
 * @example
 * <Checkbox label="Required at Every Sign-In" name="required" defaultChecked />
 */
export function Checkbox({ label, className, ...input }: CheckboxProperties) {
  return (
    <label className={classNames(styles.checkbox, className)}>
      <input {...input} type="checkbox" className={styles.input} />
      <span className={styles.box} aria-hidden="true">
        <Icon name="check" className={styles.mark} strokeWidth={3} />
      </span>
      <span className={styles.label}>{label}</span>
    </label>
  );
}

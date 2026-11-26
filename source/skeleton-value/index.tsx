import styles from "./index.module.scss";
import type { SkeletonValueProperties } from "@sharadox/interface-web-library/skeleton-value/type";

/**
 * A skeleton for one value, not a whole card: an inline shimmering shape as wide as the awaited text (a name, a
 * count) or a circle (a picture), so everything around it (labels, buttons) shows at once.
 *
 * @example
 * <p>Devices: <Suspense fallback={<SkeletonValue width="2ch" label="Loading…" />}><DeviceCount /></Suspense></p>
 */
export function SkeletonValue({ label, width = "8ch", circle }: SkeletonValueProperties) {
  const size = circle ? { width: `${circle}px`, height: `${circle}px` } : { width };
  return (
    <span
      className={circle ? `${styles.value} ${styles.circle}` : styles.value}
      style={size}
      {...(label ? { role: "status", "aria-label": label } : { "aria-hidden": true })}
    />
  );
}

import styles from "./index.module.scss";
import type { SkeletonProperties } from "@sharadox/interface-web-library/skeleton/type";

const Line = ({ short }: { short?: boolean }) => (
  <span data-part="line" className={short ? `${styles.line} ${styles.short}` : styles.line} />
);

/**
 * Where data is still loading: soft gray shapes like what will come (lines, a card, a list of rows, a profile, a grid
 * of cards), gently shimmering, so a page shows at once and fills in. Screen readers hear `label` once.
 *
 * @example
 * <Suspense fallback={<Skeleton label="Loading devices…" shape="list" rows={3} />}><DeviceList /></Suspense>
 */
export function Skeleton({ label, shape = "lines", lines = 3, rows = 3, height }: SkeletonProperties) {
  const text = Array.from({ length: lines }, (_, index) => (
    <Line key={index} short={index === lines - 1 && index > 0} />
  ));
  return (
    <div className={styles.skeleton} role="status" aria-label={label}>
      {height ? (
        <span className={styles.block} style={{ height }} />
      ) : shape === "lines" ? (
        text
      ) : shape === "card" ? (
        <span data-part="card" className={styles.card}>
          {text}
        </span>
      ) : shape === "profile" ? (
        <span data-part="card" className={`${styles.card} ${styles.profile}`}>
          <span data-part="circle" className={styles.circle} />
          <span className={styles.stack}>
            <Line short />
            <Line />
          </span>
        </span>
      ) : shape === "cards" ? (
        <span className={styles.grid}>
          {Array.from({ length: rows }, (_, index) => (
            <span key={index} data-part="card" className={styles.card}>
              <Line short />
              <Line />
            </span>
          ))}
        </span>
      ) : (
        <span data-part="card" className={styles.card}>
          {Array.from({ length: rows }, (_, index) => (
            <span key={index} data-part="row" className={styles.row}>
              <span className={styles.dot} />
              <span className={styles.stack}>
                <Line />
                <Line short />
              </span>
              <span className={styles.button} />
            </span>
          ))}
        </span>
      )}
    </div>
  );
}

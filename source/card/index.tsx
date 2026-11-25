import { classNames } from "@sharadox/web-library/class-name";
import styles from "./index.module.scss";
import type { CardProperties } from "@sharadox/interface-web-library/card/type";

/**
 * A card of the interface : an optional heading and description over its content, outlined in red for what
 * can't be undone.
 *
 * @example
 * <Card title="Emails" description="Where codes go.">…</Card>
 */
export function Card({ title, description, tone, children }: CardProperties) {
  return (
    <div className={classNames(styles.card, tone && styles[tone])}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {description && <div className={styles.description}>{description}</div>}
      {children}
    </div>
  );
}

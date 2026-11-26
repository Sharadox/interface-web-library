import { classNames } from "@sharadox/web-library/class-name";
import styles from "./index.module.scss";
import type { CardProperties } from "@sharadox/interface-web-library/card/type";

/**
 * A card of the interface: an optional heading and description over its content, outlined in red for what can't be
 * undone. An `action` (an Edit button) sits beside the content, centered on the card's height.
 *
 * @example
 * <Card title="Name" action={<Button>Edit</Button>}>Ana Silva</Card>
 */
export function Card({ title, description, tone, action, children }: CardProperties) {
  const content = (
    <>
      {title && <h2 className={styles.title}>{title}</h2>}
      {description && <div className={styles.description}>{description}</div>}
      {children}
    </>
  );
  if (!action) return <div className={classNames(styles.card, tone && styles[tone])}>{content}</div>;
  return (
    <div className={classNames(styles.card, styles.withAction, tone && styles[tone])}>
      <div className={styles.body}>{content}</div>
      <div className={styles.action}>{action}</div>
    </div>
  );
}

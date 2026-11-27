"use client";
import { useSpotlight } from "@sharadox/pointer-web-library/spotlight";
import { classNames } from "@sharadox/web-library/class-name";
import styles from "./index.module.scss";
import type { CardProperties } from "@sharadox/interface-web-library/card/type";

/**
 * A card of the interface, in the company's look (`InterfaceTheme`: its corners, surface and edge, and the pointer's
 * light on them, which follows the pointer anywhere on the page): an optional heading and description over its
 * content, edged in red for what can't be undone. An `action` (an Edit button) sits beside the content, centered on the card's height.
 *
 * @example
 * <Card title="Name" action={<Button>Edit</Button>}>Ana Silva</Card>
 */
export function Card({ title, description, tone, action, children }: CardProperties) {
  const spotlight = useSpotlight<HTMLDivElement>();
  const content = (
    <>
      {title && <h2 className={styles.title}>{title}</h2>}
      {description && <div className={styles.description}>{description}</div>}
      {children}
    </>
  );
  if (!action)
    return (
      <div ref={spotlight} className={classNames(styles.card, tone && styles[tone])}>
        {content}
      </div>
    );
  return (
    <div ref={spotlight} className={classNames(styles.card, styles.withAction, tone && styles[tone])}>
      <div className={styles.body}>{content}</div>
      <div className={styles.action}>{action}</div>
    </div>
  );
}

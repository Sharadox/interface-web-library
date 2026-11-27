import Link from "next/link";
import { Icon } from "@sharadox/icon-web-library/icon";
import { classNames } from "@sharadox/web-library/class-name";
import styles from "./index.module.scss";
import type { ButtonProperties } from "@sharadox/interface-web-library/button/type";

/** What is left of each kind once the look is taken out. */
type ButtonLinkElement = Omit<Extract<ButtonProperties, { href: string }>, keyof ButtonLookKeys>;
type ButtonElement = Omit<Extract<ButtonProperties, { href?: undefined }>, keyof ButtonLookKeys>;
type ButtonLookKeys = Record<
  "look" | "pending" | "pendingLabel" | "icon" | "arrow" | "children" | "className",
  unknown
>;

/**
 * The interface button, worn in the company's look (`InterfaceTheme`: its shape, size, letters and the look of each
 * kind): `primary` (filled), `secondary` (outlined), `plain` (text) or `danger`, with an optional icon before the
 * words and an arrow after them that slides on hover. While `pending` it shows a spinner (and `pendingLabel`), is
 * marked busy and ignores clicks, so an action never runs twice. With `href` it is a link that looks the same
 * (next/link's `Link`, or the site's own `link` component), with the arrow unless `arrow={false}`.
 *
 * @example
 * <Button type="submit" pending={saving} pendingLabel="Saving…">Save</Button>
 * <Button href="/en#booking" link={SectionLink}>Book a Visit</Button>
 */
export function Button(properties: ButtonProperties) {
  const { look = "primary", pending = false, pendingLabel, icon, arrow, children, className, ...element } = properties;
  const names = classNames(styles.button, styles[look], className);
  const content = (showArrow: boolean) => (
    <>
      {pending ? <span className={styles.spinner} aria-hidden="true" /> : icon && <Icon name={icon} />}
      <span className={styles.label}>{pending && pendingLabel ? pendingLabel : children}</span>
      {showArrow && (
        <span className={styles.arrow} data-arrow="" aria-hidden="true">
          <Icon name="chevron-right" />
        </span>
      )}
    </>
  );
  if (element.href !== undefined) {
    const { link: Anchor = Link, ...anchor } = element as ButtonLinkElement;
    return (
      <Anchor {...anchor} className={names}>
        {content(arrow ?? true)}
      </Anchor>
    );
  }
  // A plain button: `href` and `link` are undefined here, so nothing of them reaches the element.
  const { disabled, type = "button", ...button } = element as ButtonElement;
  return (
    <button {...button} type={type} className={names} disabled={disabled || pending} aria-busy={pending || undefined}>
      {content(arrow ?? false)}
    </button>
  );
}

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ComponentType, ReactNode } from "react";
import type { IconName } from "@sharadox/icon-web-library/icon/type";

/** What a link component receives to render a button-looking link (next/link's `Link` by default). */
export interface ButtonLinkProperties extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children: ReactNode;
}

/** What every button shares, a link or not. */
interface ButtonLook {
  /** `primary` (filled), `secondary` (outlined), `plain` (text, underlined as the theme says) or `danger`. */
  look?: "primary" | "secondary" | "plain" | "danger";
  /** Shows a spinner and stops clicks while an action runs; `pendingLabel` replaces the text. */
  pending?: boolean;
  pendingLabel?: string;
  /** An icon before the words. */
  icon?: IconName;
  /** An arrow after the words that slides on hover: "go there". Links have it unless told otherwise. */
  arrow?: boolean;
  children: ReactNode;
}

/** A button, or a link that looks like one (with `href`). */
export type ButtonProperties =
  | (ButtonLook & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined; link?: undefined })
  | (ButtonLook &
      Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
        /** Where the link leads. */
        href: string;
        /** The link component (a site's own, such as one gliding to sections): next/link's `Link` by default. */
        link?: ComponentType<ButtonLinkProperties>;
      });

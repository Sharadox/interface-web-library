export interface SkeletonProperties {
  /** What is loading, read aloud once ("Loading devices…"). */
  label: string;
  /**
   * What it stands for: `lines` of text (the default), a `card` of lines, a `list` of rows (an icon, two lines and a
   * button each), a `profile` (a picture and a name), or a grid of `cards`.
   */
  shape?: "lines" | "card" | "list" | "profile" | "cards";
  /** How many lines of text (3 by default). */
  lines?: number;
  /** How many rows or cards (3 by default). */
  rows?: number;
  /** A block (a picture, a card) instead of lines, this many pixels tall. */
  height?: number;
}

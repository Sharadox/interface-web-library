export interface SkeletonValueProperties {
  /** What is loading, read aloud ("Loading your name…"); without it the shape is silent (a parent says it). */
  label?: string;
  /** How wide the awaited text is, in any CSS length ("8ch" by default). */
  width?: string;
  /** A round shape this many pixels wide instead (a picture). */
  circle?: number;
}

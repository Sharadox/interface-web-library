export interface CopyButtonProperties {
  /** What is copied. */
  value: string;
  /** The button's words ("Copy", "Copy all"). */
  label: string;
  /** Said for 2 seconds once copied ("Copied."). */
  copiedLabel: string;
  /** After copying (to show a notification). */
  onCopied?: () => void;
}

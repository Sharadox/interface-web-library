export interface CodeBoxesProperties {
  /** The group's name ("Code"); each box reads "Code, digit 3 of 6". */
  label: string;
  /** "digit" and "of", in the reader's language. */
  digitLabel: string;
  ofLabel: string;
  /** The hidden field's name, for forms. */
  name?: string;
  length?: number;
  /** Once every box has its digit. */
  onComplete?: (code: string) => void;
  invalid?: boolean;
  disabled?: boolean;
  describedBy?: string;
  autoFocus?: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProperties {
  label: string;
  options: readonly SelectOption[];
  /** The chosen value, when the parent keeps it; otherwise `defaultValue` starts it. */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** The form field the value is sent as. */
  name?: string;
  /** Shown while nothing is chosen. */
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

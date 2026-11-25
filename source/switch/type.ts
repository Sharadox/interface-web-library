export interface SwitchProperties {
  /** What it switches ("Required at every sign-in"). */
  label: string;
  checked: boolean;
  /**
   * Runs the change (the switch already shows the new value, with a loader): false when it failed, so the switch flips
   * back; anything else keeps it.
   */
  onChange: (checked: boolean) => Promise<boolean | unknown>;
  disabled?: boolean;
}

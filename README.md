# @sharadox/interface-web-library

Accessible, themable interface pieces for web applications: buttons, cards, dialogs, one-time code boxes, switches,
text fields with prefixes, tips, copy buttons, skeletons and notifications. React 19, no global stylesheet: each piece
ships its own CSS module, and an application dresses them all in its look with `InterfaceTheme`.

Every piece follows the same rules: anything pending shows a loader where it happens, a change shows at once and goes
back if it fails, dialogs sit in the middle of the screen, fields keep prefixes and suffixes as their own sections,
anything copyable has a copy button, loading placeholders look like what is coming, and scrollbars are thin and styled.
Nothing is in any language: every word comes in as a property.

## Install

```sh
pnpm add @sharadox/interface-web-library
```

Next.js (or any bundler that handles CSS modules) is enough; icons come from `@sharadox/icon-web-library`.

## Look: `interface-theme`

`InterfaceTheme({ theme, className? })` sets `--interface-*` custom properties on a wrapper, which every piece reads;
anything left out keeps its plain default. `interfaceThemeStyle(theme)` gives the same properties as a style object.

| Value                                                         | What it styles                                    |
| ------------------------------------------------------------- | ------------------------------------------------- |
| `background`, `surface`, `surfaceRaised`                      | the page, panels, cards, menus and dialogs        |
| `text`, `textSoft`, `line`                                    | text, secondary text, lines                       |
| `accent`, `accentText`, `danger`, `success`                   | buttons, focus rings and links; errors; successes |
| `radius`, `smallRadius`, `shadow`                             | corners and the shadow of what floats             |
| `font`, `fontDisplay`                                         | text and headings                                 |
| `barHeight`                                                   | the site's fixed bar: notifications sit below it  |
| `fieldBackground`, `fieldBorder`, `fieldHeight`, `fieldFocus` | fields, so they look like the site's own forms    |
| `labelSize`, `labelSpacing`, `labelCase`                      | field labels (`labelCase: "uppercase"`)           |

```tsx
<InterfaceTheme theme={{ accent: "var(--gold)", font: "var(--font-body)", labelCase: "uppercase" }}>
  {children}
</InterfaceTheme>
```

## Pieces

- **`button`** `Button({ look?, pending?, pendingLabel?, icon?, ...button })`: `primary`, `quiet`, `danger` or
  `plain`; while `pending` a spinner, marked busy, clicks ignored.
- **`card`** `Card({ title?, description?, tone?, children })`: a panel; `tone="danger"` for what can't be undone.
- **`code-boxes`** `CodeBoxes({ label, digitLabel, ofLabel, length?, onComplete?, invalid?, disabled?, ... })`: one box
  per digit, pasting fills them all, `onComplete` once full; each box reads "Code, digit 3 of 6".
- **`copy-button`** `CopyButton({ value, label, copiedLabel, onCopied? })`.
- **`dialog`** `Dialog({ open, onClose, title, closeLabel, children })`: the browser's modal dialog, always centered,
  closed by Escape, its button or the backdrop.
- **`pending-mark`** `PendingMark({ label })`: a small spinner with "Saving…" beside a value already shown as it will
  be.
- **`skeleton`** `Skeleton({ label, shape?, lines?, rows?, height? })`: `lines`, `card`, `list`, `profile` or `cards`,
  shimmering, read once by screen readers.
- **`switch`** `Switch({ label, checked, onChange, disabled? })`: flips the moment it's pressed with a loader on its
  knob, and flips back when `onChange` answers false.
- **`text-field`** `TextField({ label, tip?, prefix?, suffix?, hint?, error?, ...input })`: the prefix ("@") and suffix
  are their own sections, never part of the value; an error marks it invalid and is read with it.
- **`tip`** `Tip({ text, label })`: a question mark beside a label that explains it.
- **`toast`** `ToastProvider({ label, dismissLabel, duration?, children })` and `useToast().notify(message, tone?)`:
  notifications at the top right below the bar, hiding themselves after a few seconds or closed by hand.

Styles for your own CSS modules: `@use "style/interface" as *;` (from this package's `source`) gives the tokens
(`$accent`, `$surface`, …) and the `scrollbar`, `focus` and `card` mixins.

## License

Sharadox Open Source License 0.1.0 (see `LICENSE.md`).

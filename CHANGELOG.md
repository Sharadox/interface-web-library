# Changelog

What changed in each version of `@sharadox/interface-web-library`, newest first.

## 0.2.1

A leaving dialog stops being modal at once, so the page behind works while it animates away. A checkbox's own input lies exactly over its drawn box, so clicking the box clicks the checkbox.

## 0.2.0

New: `Select` (a custom, accessible select), `Checkbox` (drawn like the buttons), `SkeletonValue` (a skeleton for one value) and `Card`'s `action`, centered beside the content. Code boxes are square, spread over the width, and Backspace or Delete clears the box it is on. Dialogs leave with their opening animation backwards. Prefixes and suffixes are at least square. Font sizes are 12, 14, 16 or 24, with no line heights.

## 0.1.0

The first pieces, from the account screens of `@sharadox/account-web-library`, made neutral: `Button`, `Card`,
`CodeBoxes`, `CopyButton`, `Dialog`, `PendingMark`, `Skeleton`, `Switch`, `TextField`, `Tip`, `ToastProvider` and
`useToast`, and `InterfaceTheme` with the `style/interface` tokens and mixins.

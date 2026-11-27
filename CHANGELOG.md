# Changelog

What changed in each version of `@sharadox/interface-web-library`, newest first.

## 0.3.0

Buttons and cards wear the company's whole look: theme values for every button's shape, size and letters, the filled (primary), outlined (secondary, was quiet) and plain looks, a glint on hover and a gradient that slides across (`primaryBackgroundSize`), and cards' surface and edge lit by the pointer. A button with href is a link that looks the same (next/link, or the site's own link component), and an arrow after the words (its line weight from the theme) slides on hover (links have it by default). The outlined look is now `secondary` (`quiet` is gone).

## 0.2.1

A leaving dialog stops being modal at once, so the page behind works while it animates away. A checkbox's own input lies exactly over its drawn box, so clicking the box clicks the checkbox. The code boxes fit the width they are given, inside a grid or a flex column too (they no longer push a dialog wider).

## 0.2.0

New: `Select` (a custom, accessible select), `Checkbox` (drawn like the buttons), `SkeletonValue` (a skeleton for one value) and `Card`'s `action`, centered beside the content. Code boxes are square, spread over the width, and Backspace or Delete clears the box it is on. Dialogs leave with their opening animation backwards. Prefixes and suffixes are at least square. Font sizes are 12, 14, 16 or 24, with no line heights.

## 0.1.0

The first pieces, from the account screens of `@sharadox/account-web-library`, made neutral: `Button`, `Card`,
`CodeBoxes`, `CopyButton`, `Dialog`, `PendingMark`, `Skeleton`, `Switch`, `TextField`, `Tip`, `ToastProvider` and
`useToast`, and `InterfaceTheme` with the `style/interface` tokens and mixins.

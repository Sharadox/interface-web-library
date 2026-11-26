"use client";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "@sharadox/icon-web-library/icon";
import { classNames } from "@sharadox/web-library/class-name";
import styles from "./index.module.scss";
import type { SelectProperties } from "@sharadox/interface-web-library/select/type";

/**
 * A select drawn by the interface, not the browser: a labelled button showing the choice, opening a list styled like
 * the rest. It works as a native select does (the select-only combobox of the ARIA practices): the arrows, Home and
 * End move, Enter, Space or Tab choose, Escape closes, a letter jumps to the next option starting with it, and a
 * click outside closes. With a `name`, the value goes in a hidden field for forms.
 *
 * @example
 * <Select label="Month" name="month" placeholder="Month" options={[{ value: "1", label: "January" }]} />
 */
export function Select({
  label,
  options,
  value,
  defaultValue,
  onChange,
  name,
  placeholder,
  disabled,
  id,
  className,
}: SelectProperties) {
  const generated = useId();
  const buttonId = id ?? generated;
  const listId = `${buttonId}-list`;
  const labelId = `${buttonId}-label`;
  const [own, setOwn] = useState(defaultValue ?? "");
  const chosen = value ?? own;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const chosenIndex = options.findIndex((option) => option.value === chosen);

  const choose = (index: number) => {
    const option = options[index]!;
    setOwn(option.value);
    onChange?.(option.value);
    setOpen(false);
  };
  const show = () => {
    setActive(Math.max(0, chosenIndex));
    setOpen(true);
  };
  /** The next option after `from` whose label starts with `letter`, from the top again at the end. */
  const startingWith = (letter: string, from: number) => {
    for (let step = 1; step <= options.length; step++) {
      const index = (from + step) % options.length;
      if (options[index]!.label.toLowerCase().startsWith(letter)) return index;
    }
    return -1;
  };

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!root.current!.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);
  useEffect(() => {
    if (open) list.current?.querySelector("[data-active]")?.scrollIntoView?.({ block: "nearest" });
  }, [open, active]);

  const keyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const { key } = event;
    if (key.length === 1 && key !== " ") {
      const index = startingWith(key.toLowerCase(), open ? active : chosenIndex);
      if (index < 0) return;
      if (open) setActive(index);
      else choose(index);
      return;
    }
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(key)) {
        event.preventDefault();
        show();
      }
      return;
    }
    const moves: Record<string, number> = {
      ArrowDown: Math.min(options.length - 1, active + 1),
      ArrowUp: Math.max(0, active - 1),
      Home: 0,
      End: options.length - 1,
    };
    if (key in moves) {
      event.preventDefault();
      setActive(moves[key]!);
    } else if (key === "Enter" || key === " ") {
      event.preventDefault();
      choose(active);
    } else if (key === "Tab") choose(active);
    else if (key === "Escape") {
      event.preventDefault();
      setOpen(false);
    }
  };

  return (
    <div ref={root} className={classNames(styles.field, className)}>
      <span id={labelId} className={styles.label}>
        {label}
      </span>
      {name && <input type="hidden" name={name} value={chosen} />}
      <button
        id={buttonId}
        type="button"
        role="combobox"
        className={styles.button}
        aria-labelledby={labelId}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        disabled={disabled}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={keyDown}
      >
        <span className={classNames(styles.value, chosenIndex < 0 && styles.placeholder)}>
          {chosenIndex < 0 ? placeholder : options[chosenIndex]!.label}
        </span>
        <Icon name="chevron-down" className={styles.chevron} />
      </button>
      {open && (
        <ul ref={list} id={listId} role="listbox" aria-labelledby={labelId} className={styles.list} tabIndex={-1}>
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={index === chosenIndex}
              data-active={index === active ? "" : undefined}
              className={styles.option}
              onPointerMove={() => setActive(index)}
              onClick={() => choose(index)}
            >
              {option.label}
              {index === chosenIndex && <Icon name="check" className={styles.check} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

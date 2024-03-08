import {
  createHooks,
  _stringifyValue as stringifyValue,
} from "@css-hooks/qwik";
import { recommended } from "@css-hooks/recommended";

export const { styleSheet, css } = createHooks({
  hooks: {
    ...recommended({
      breakpoints: ["640px"],
      pseudoClasses: [":active", ":focus-visible", ":hover"],
    }),
    "&.selected": "&.selected",
    ".group:hover &": ".group:hover &",
    "@media (prefers-color-scheme: dark)": {
      or: [
        "[data-theme='dark'] &",
        {
          and: ["[data-theme='auto'] &", "@media (prefers-color-scheme: dark)"],
        },
      ],
    },
    "@media (prefers-color-scheme: light)": {
      or: [
        "[data-theme='light'] &",
        {
          and: [
            "[data-theme='auto'] &",
            "@media (prefers-color-scheme: light)",
          ],
        },
      ],
    },
  },
  sort: {
    conditionalStyles: false,
  },
  debug: import.meta.env.DEV,
});

export function renderToString(obj: Parameters<typeof css>[0]) {
  return Object.entries(css(obj))
    .map(
      ([k, v]) =>
        `${/^--/.test(k) ? k : k.replace(/[A-Z]/g, x => `-${x.toLowerCase()}`)}:${stringifyValue(
          k,
          v,
        )}`,
    )
    .join(";");
}

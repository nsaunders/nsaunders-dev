import type { CSSProperties } from "@builder.io/qwik";
import { stringifyValue } from "@css-hooks/qwik";
import { recommended } from "@css-hooks/recommended";
import { buildHooksSystem } from "./css-hooks-core";

const createHooks = buildHooksSystem<CSSProperties>(stringifyValue);

export const [hooks, css] = createHooks({
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
        and: ["[data-theme='auto'] &", "@media (prefers-color-scheme: light)"],
      },
    ],
  },
});

export function renderToString(obj: Parameters<typeof css>[0]) {
  return Object.entries(css(obj))
    .map(
      ([k, v]) =>
        `${k.replace(/[A-Z]/g, (x) => `-${x.toLowerCase()}`)}:${stringifyValue(
          k,
          v
        )}`
    )
    .join(";");
}

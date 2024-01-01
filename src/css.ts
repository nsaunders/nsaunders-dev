import { createHooks } from "@css-hooks/qwik";
import { recommended } from "@css-hooks/recommended";

export const [hooks, css] = createHooks({
  ...recommended({
    breakpoints: ["640px"],
    pseudoClasses: [":active", ":focus-visible", ":hover"],
  }),
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

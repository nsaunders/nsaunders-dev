import { type CSSProperties, component$ } from "@builder.io/qwik";
import * as V from "varsace";
import { css } from "~/css";
import { Anchor } from "./anchor";

type Props = { style?: CSSProperties };

export const PageFooter = component$(({ style }: Props) => (
  <footer
    style={{
      ...css({
        background: V.gray05,
        padding: "1em",
        display: "flex",
        gap: "1em",
        on: $ => [
          $("@media (prefers-color-scheme: dark)", {
            background: V.black,
          }),
        ],
      }),
      ...style,
    }}
  >
    <Anchor href="https://x.com/agilecoder">X</Anchor>
    <Anchor href="https://github.com/nsaunders">GitHub</Anchor>
    <Anchor href="https://linkedin.com/in/nicksaunders">LinkedIn</Anchor>
    <div style={{ flex: 1 }} />
    <Anchor href="/rss.xml">RSS</Anchor>
  </footer>
));

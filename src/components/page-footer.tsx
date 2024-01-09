import { type CSSProperties, component$ } from "@builder.io/qwik";
import * as V from "varsace";
import { css } from "~/css";
import { AnchorLink } from "./anchor-link";

type Props = { style?: CSSProperties };

export const PageFooter = component$(({ style }: Props) => (
  <footer
    style={{
      ...css({
        background: V.gray05,
        "@media (prefers-color-scheme: dark)": {
          background: V.black,
        },
        padding: "1em",
        display: "flex",
        gap: "1em",
      }),
      ...style,
    }}
  >
    <AnchorLink href="https://x.com/agilecoder">X</AnchorLink>
    <AnchorLink href="https://github.com/nsaunders">GitHub</AnchorLink>
    <AnchorLink href="https://linkedin.com/in/nicksaunders">
      LinkedIn
    </AnchorLink>
    <div style={{ flex: 1 }} />
    <AnchorLink href="/rss.xml">RSS</AnchorLink>
  </footer>
));

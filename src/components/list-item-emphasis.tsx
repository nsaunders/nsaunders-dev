import { component$, Slot, type CSSProperties } from "@builder.io/qwik";
import * as V from "varsace";
import { css } from "~/css";

type Props = {
  style?: CSSProperties;
};

export const ListItemEmphasis = component$(({ style }: Props) => (
  <div
    style={css(
      {
        background: V.gray05,
        padding: "2em",
        on: $ => [
          $("@media (prefers-color-scheme: dark)", {
            background: V.gray80,
          }),
        ],
      },
      style,
    )}
  >
    <Slot />
  </div>
));

import { type CSSProperties, component$, Slot } from "@builder.io/qwik";
import { css } from "~/css";

export type Props = {
  style?: CSSProperties;
};

export const BlockSection = component$(({ style }: Props) => (
  <div
    style={css(
      {
        width: "calc(100% - 64px)",
        maxWidth: "896px",
        margin: "0 auto",
      },
      style
    )}
  >
    <Slot />
  </div>
));

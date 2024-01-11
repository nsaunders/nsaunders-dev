import {
  type PropsOf,
  type CSSProperties,
  component$,
  Slot,
} from "@builder.io/qwik";
import clsx from "clsx";
import * as V from "varsace";
import { css } from "~/css";

type Props = Omit<PropsOf<"a">, "style"> & {
  selected?: boolean;
  style?: CSSProperties;
};

export const anchorLinkStyle = ({ style: overrides = {} }: Props = {}) =>
  css(
    {
      color: V.blue40,
      textDecoration: "inherit",
      outlineWidth: 0,
      outlineStyle: "solid",
      outlineColor: V.blue20,
      outlineOffset: "2px",
      borderRadius: "2px",
      "&:hover": {
        color: V.blue50,
        textDecoration: "underline",
      },
      "&:active": {
        color: V.red50,
      },
      "@media (prefers-color-scheme: dark)": {
        color: V.blue30,
        outlineColor: V.blue50,
        "&:hover": {
          color: V.blue20,
        },
        "&:active": {
          color: V.red20,
        },
      },
      "&:focus-visible": {
        outlineWidth: "2px",
      },
      "&.selected": {
        color: "inherit",
      },
    },
    overrides
  );

export const AnchorLink = component$((props: Props) => (
  <a
    {...props}
    class={clsx(props.class, props.selected && "selected")}
    style={anchorLinkStyle(props)}
  >
    <Slot />
  </a>
));

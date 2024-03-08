import {
  type PropsOf,
  type CSSProperties,
  component$,
  Slot,
} from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import clsx from "clsx";
import * as V from "varsace";
import { css } from "~/css";

type Props = {
  selected?: boolean;
  style?: CSSProperties;
};

export const anchorStyle = ({ style: overrides = {} }: Props = {}) =>
  css(
    {
      color: V.blue40,
      textDecoration: "inherit",
      outlineWidth: 0,
      outlineStyle: "solid",
      outlineColor: V.blue20,
      outlineOffset: "2px",
      borderRadius: "2px",
      on: ($, { and }) => [
        $("&:hover", {
          color: V.blue50,
          textDecoration: "underline",
        }),
        $("&:active", {
          color: V.red50,
        }),
        $("@media (prefers-color-scheme: dark)", {
          color: V.blue30,
          outlineColor: V.blue50,
        }),
        $(and("@media (prefers-color-scheme: dark)", "&:hover"), {
          color: V.blue20,
        }),
        $(and("@media (prefers-color-scheme: dark)", "&:active"), {
          color: V.red20,
        }),
        $("&:focus-visible", {
          outlineWidth: "2px",
        }),
        $("&.selected", {
          color: "inherit",
        }),
      ],
    },
    overrides,
  );

export const Anchor = component$(
  (props: Omit<PropsOf<"a">, keyof Props> & Props) => (
    <a
      {...props}
      class={clsx(props.class, props.selected && "selected")}
      style={anchorStyle(props)}
    >
      <Slot />
    </a>
  ),
);

export const AnchorLink = component$(
  (props: Omit<PropsOf<"a">, keyof Props> & Props) => (
    <Link
      {...props}
      class={clsx(props.class, props.selected && "selected")}
      style={anchorStyle(props)}
    >
      <Slot />
    </Link>
  ),
);

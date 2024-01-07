import { Slot, component$, type CSSProperties } from "@builder.io/qwik";
import { css } from "~/css";

export type Props = {
  style?: CSSProperties;
};

export default component$(({ style }: Props) => (
  <div style={css({ display: "inline-flex", gap: "8px" }, style)}>
    <div style={{ display: "grid", placeItems: "center" }}>
      <Slot name="label" />
    </div>
    <div style={{ display: "grid", placeItems: "center" }}>
      <Slot name="value" />
    </div>
  </div>
));

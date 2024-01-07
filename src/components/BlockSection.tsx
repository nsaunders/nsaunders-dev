import { type CSSProperties, component$, Slot } from "@builder.io/qwik";

export type Props = {
  style?: CSSProperties;
};

export default component$(({ style }: Props) => (
  <div
    style={{
      width: "calc(100% - 64px)",
      maxWidth: "896px",
      margin: "0 auto",
      ...style,
    }}
  >
    <Slot />
  </div>
));

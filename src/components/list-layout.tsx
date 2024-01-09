import { type JSXChildren, Slot, component$ } from "@builder.io/qwik";

type Props = {
  title?: JSXChildren;
};

export const ListLayout = component$(({ title }: Props) => (
  <section style={{ display: "flex", flexDirection: "column" }}>
    {title ? (
      <h1
        style={{
          margin: 0,
          fontSize: "2rem",
          marginBottom: "0.5em",
          fontWeight: 400,
        }}
      >
        {title}
      </h1>
    ) : undefined}
    <Slot />
  </section>
));

import * as V from "varsace";
import { css } from "~/css";
import { BlockSection } from "./block-section";
import { Slot, component$ } from "@builder.io/qwik";

export const Jumbotron = component$(() => (
  <section
    style={css({
      background: V.gray05,
      fontSize: "1.5em",
      padding: "1em 0 2em 0",
      display: "flex",
      on: $ => [
        $("@media (prefers-color-scheme: dark)", {
          background: V.gray80,
        }),
      ],
    })}
  >
    <BlockSection
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1em",
      }}
    >
      <h1
        style={css({
          color: V.purple50,
          fontSize: "1.6em",
          fontWeight: 400,
          margin: 0,
          on: $ => [
            $("@media (prefers-color-scheme: dark)", {
              color: V.orange20,
            }),
          ],
        })}
      >
        <Slot name="headline" />
      </h1>
      <Slot />
    </BlockSection>
  </section>
));

import { Slot, component$ } from "@builder.io/qwik";
import { css } from "~/css";
import type * as Projects from "~/data/projects";
import { AnchorLink } from "./anchor-link";
import * as Icon from "~/components/icons";

const ProjectListItemDetail = component$(() => (
  <div style={{ display: "flex", alignItems: "center", gap: "0.375em" }}>
    <Slot />
  </div>
));

type Props = Awaited<ReturnType<typeof Projects.list>>[number];

export const ProjectListItem = component$(
  ({ url, name, description, language, stars, forks }: Props) => (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <AnchorLink href={url} style={{ fontSize: "1.25em", fontWeight: 700 }}>
        {name}
      </AnchorLink>
      <p style={{ margin: 0, marginTop: "0.5em", flex: 1, lineHeight: 1.5 }}>
        {description}
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "1.25em",
          marginTop: "2em",
        }}
      >
        <ProjectListItemDetail>
          <div
            style={css({
              width: "0.75em",
              height: "0.75em",
              borderRadius: "999px",
              backgroundColor: language.color,
              "@media (prefers-color-scheme: dark)": {
                boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.2)",
              },
            })}
          />
          {language.name}
        </ProjectListItemDetail>
        <ProjectListItemDetail>
          <Icon.Star />
          {stars}
        </ProjectListItemDetail>
        {!!forks && (
          <ProjectListItemDetail>
            <Icon.Fork />
            {forks}
          </ProjectListItemDetail>
        )}
      </div>
    </div>
  )
);

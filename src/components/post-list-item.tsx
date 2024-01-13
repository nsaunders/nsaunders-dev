import * as V from "varsace";
import type * as Posts from "~/data/posts";
import { css } from "~/css";
import readingTime from "reading-time";
import { AnchorLink } from "./anchor";
import { component$ } from "@builder.io/qwik";

export const PostListItem = component$(
  ({
    name,
    title,
    published,
    description,
    markdown,
  }: Awaited<ReturnType<typeof Posts.getByName>>) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "0.5em",
      }}
    >
      <div
        style={css({
          display: "flex",
          gap: "0.5em",
          color: V.gray60,
          "@media (prefers-color-scheme: dark)": {
            color: V.gray30,
          },
        })}
      >
        <span>
          {published.toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <span>{`${Math.ceil(readingTime(markdown).minutes)} minutes`}</span>
      </div>
      <AnchorLink href={`/posts/${name}`} style={{ fontSize: "2em" }}>
        {title}
      </AnchorLink>
      <div style={{ lineHeight: 1.5 }}>{description}</div>
    </div>
  )
);

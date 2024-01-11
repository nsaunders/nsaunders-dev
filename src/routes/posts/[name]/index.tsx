import { component$ } from "@builder.io/qwik";
import {
  type StaticGenerateHandler,
  routeLoader$,
  z,
} from "@builder.io/qwik-city";
import * as V from "varsace";
import readingTime from "reading-time";
import { BlockSection } from "~/components/block-section";
import { Jumbotron } from "~/components/jumbotron";
import * as Markdown from "~/markdown";
import * as Posts from "~/data/posts";
import { css } from "~/css";
import * as Icon from "~/components/icons";
import { ScreenReaderOnly } from "~/components/screen-reader-only";
import { LabelValuePair } from "~/components/label-value-pair";
import { AnchorLink } from "~/components/anchor-link";

export const usePost = routeLoader$(async (requestEvent) => {
  const post = await Posts.getByName(requestEvent.params.name);
  return {
    ...post,
    html: await Markdown.render(post.markdown),
  };
});

const Subscribe = component$(() => {
  const flex = "1 1 calc((60ch - 100%) * 999)";
  return (
    <section
      style={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{ flex, background: V.gray05, color: V.gray80, padding: "3em" }}
      >
        <h1
          style={{
            fontSize: "2em",
            fontWeight: 700,
            lineHeight: 1.25,
            marginBlock: 0,
          }}
        >
          Stay informed
        </h1>
        <p
          style={{
            fontSize: "1.5em",
            fontWeight: 400,
            lineHeight: 1.25,
            marginBlock: "1em",
          }}
        >
          Subscribe to email updates and be the first to know when I post new
          content.
        </p>
        <p
          style={{
            fontWeight: 400,
            lineHeight: 1.25,
            marginBlock: 0,
            color: V.gray60,
          }}
        >
          I hate spam as much as you do.
          <br />
          Unsubscribe at any time — no hard feelings!
        </p>
      </div>
      <form
        hx-boost="false"
        style={{
          flex,
          background: V.gray80,
          color: V.white,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          padding: "3em",
          gap: "2em",
        }}
        method="POST"
        action="https://dev.us21.list-manage.com/subscribe/post?u=1961e884a06fdad7a53bc160e&id=3f29e7fcdf&f_id=00905ce1f0"
      >
        {(
          [
            ["Email", "email", "EMAIL", true],
            ["First name", "text", "FNAME", false],
          ] as const
        ).map(([label, inputType, name, required]) => (
          <label
            key={label}
            style={{ display: "flex", flexDirection: "column", gap: "0.5em" }}
          >
            <div style={{ lineHeight: 1 }}>{label}</div>
            <input
              type={inputType}
              name={name}
              required={required}
              style={css({
                background: V.gray05,
                color: V.gray90,
                font: "inherit",
                lineHeight: 1,
                padding: "0.5em",
                border: 0,
                borderRadius: "0.25em",
                outlineWidth: 0,
                outlineStyle: "solid",
                outlineColor: V.blue50,
                outlineOffset: "2px",
                "&:focus-visible": {
                  outlineWidth: "2px",
                },
              })}
            />
          </label>
        ))}
        <div aria-hidden="true" style="position: absolute; left: -5000px;">
          <input
            data-desc="thwart-bots"
            type="text"
            name="b_1961e884a06fdad7a53bc160e_3f29e7fcdf"
            tabIndex={-1}
          />
        </div>
        <button
          type="submit"
          style={css({
            alignSelf: "center",
            font: "inherit",
            lineHeight: 1,
            padding: "0.5em 0.75em",
            margin: 0,
            border: 0,
            borderRadius: "0.25em",
            background: V.blue50,
            color: V.white,
            outlineWidth: 0,
            outlineStyle: "solid",
            outlineColor: V.blue50,
            outlineOffset: "2px",
            "&:focus-visible": {
              outlineWidth: "2px",
            },
            "&:hover": {
              background: V.blue40,
            },
            "&:active": {
              background: V.red40,
            },
          })}
        >
          Subscribe
        </button>
      </form>
    </section>
  );
});

export default component$(() => {
  const post = usePost();
  return (
    <main style={{ display: "flex", flexDirection: "column", gap: "2em" }}>
      <Jumbotron>
        <span q:slot="headline">{post.value.title}</span>
        <p style={{ marginBlock: 0 }}>{post.value.description}</p>
        <div
          style={css({
            display: "flex",
            gap: "2em",
            fontSize: "0.75em",
            marginTop: "1em",
            color: V.gray60,
            "@media (prefers-color-scheme: dark)": {
              color: V.gray30,
            },
          })}
        >
          <LabelValuePair>
            <div q:slot="label" style={{ display: "contents" }}>
              <Icon.Calendar aria-hidden />
              <ScreenReaderOnly>Posted date</ScreenReaderOnly>
            </div>
            <span q:slot="value">
              {post.value.published.toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </LabelValuePair>
          <LabelValuePair>
            <div q:slot="label" style={{ display: "contents" }}>
              <Icon.Clock aria-hidden />
              <ScreenReaderOnly>Reading time</ScreenReaderOnly>
            </div>
            <span q:slot="value">
              {`${Math.ceil(readingTime(post.value.markdown).minutes)} minutes`}
            </span>
          </LabelValuePair>
        </div>
      </Jumbotron>
      <BlockSection>
        <div
          style={{ lineHeight: 1.5 }}
          dangerouslySetInnerHTML={post.value.html}
        />
        <div style={{ display: "flex", gap: "0.5em", marginBlockStart: "2em" }}>
          <AnchorLink href={post.value.discussionHref}>
            Discuss this post
          </AnchorLink>
          <span style={{ color: V.gray50 }}>|</span>
          <AnchorLink href={post.value.editHref}>Suggest an edit</AnchorLink>
        </div>
      </BlockSection>
      <BlockSection>
        <div style={{ padding: "2em 0" }}>
          <Subscribe />
        </div>
      </BlockSection>
    </main>
  );
});

export const onStaticGenerate: StaticGenerateHandler = async () => {
  const res = await fetch(
    "https://api.github.com/repos/nsaunders/writing/contents/posts"
  );
  if (!res.ok) {
    throw new Error("Failed to retrieve list of posts.");
  }
  const schema = z.array(
    z.object({
      name: z.string(),
    })
  );
  const params = schema
    .parse(await res.json())
    .filter((x) => /^[a-z0-9-]+$/.test(x.name));
  return { params };
};

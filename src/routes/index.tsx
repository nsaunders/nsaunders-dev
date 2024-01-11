import { type JSXNode, component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import * as V from "varsace";
import { AnchorLink } from "~/components/anchor-link";
import { BlockSection } from "~/components/block-section";
import { Jumbotron } from "~/components/jumbotron";
import { ListItemEmphasis } from "~/components/list-item-emphasis";
import { ListLayout } from "~/components/list-layout";
import { PostListItem } from "~/components/post-list-item";
import { ProjectListItem } from "~/components/project-list-item";
import { css } from "~/css";
import * as Posts from "~/data/posts";
import * as Projects from "~/data/projects";

export const useLatestPost = routeLoader$(Posts.getLatest);
export const useFeaturedProject = routeLoader$(Projects.getFeatured);

export default component$(() => {
  const latestPost = useLatestPost();
  const featuredProject = useFeaturedProject();

  return (
    <main style={{ display: "flex", flexDirection: "column", gap: "4em" }}>
      <Jumbotron>
        <span q:slot="headline">Hi there, I'm Nick.</span>
        <p style={{ marginBlock: 0 }}>
          I&apos;m an experienced software engineer focused on React,
          TypeScript, user experience, and design systems. I also dabble in
          functional programming.
        </p>
      </Jumbotron>
      <BlockSection
        style={{ display: "flex", flexDirection: "column", gap: "2em" }}
      >
        {(
          [
            latestPost.value && [
              <section key="latestPost">
                <ListLayout title="Latest post">
                  <ListItemEmphasis>
                    <PostListItem {...latestPost.value} />
                  </ListItemEmphasis>
                </ListLayout>
              </section>,
              "/posts",
            ],
            featuredProject.value && [
              <section key="featuredProject">
                <ListLayout title="Featured project">
                  <ListItemEmphasis>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(min(32ch, 100%), 1fr))",
                        gap: "2em",
                      }}
                    >
                      <ListItemEmphasis
                        style={css({
                          background: V.white,
                          "@media (prefers-color-scheme: dark)": {
                            background: V.gray70,
                          },
                        })}
                      >
                        <ProjectListItem {...featuredProject.value} />
                      </ListItemEmphasis>
                      <div style={{ lineHeight: 1.5 }}>
                        {featuredProject.value.story}
                      </div>
                    </div>
                  </ListItemEmphasis>
                </ListLayout>
              </section>,
              "/projects",
            ],
          ] as [JSXNode, string][]
        ).flatMap((item, i) => {
          const [contentInner, viewMore] = item;
          const content = (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1em" }}
            >
              {contentInner}
              <AnchorLink href={viewMore}>View more&hellip;</AnchorLink>
            </div>
          );
          return (
            <>
              {i
                ? [
                    <hr
                      key={i}
                      style={css({
                        border: 0,
                        width: "100%",
                        height: "1px",
                        background: V.gray20,
                        "@media (prefers-color-scheme: dark)": {
                          background: V.gray80,
                        },
                      })}
                    />,
                    content,
                  ]
                : [content]}
            </>
          );
        })}
      </BlockSection>
    </main>
  );
});

export const head: DocumentHead = {
  title: "Nick Saunders — nsaunders.dev",
  meta: [
    {
      name: "description",
      content: "Nick Saunders' technical profile and blog",
    },
  ],
};

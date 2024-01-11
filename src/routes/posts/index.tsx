import { Fragment, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import * as Posts from "~/data/posts";
import * as V from "varsace";
import { css } from "~/css";
import { PostListItem } from "~/components/post-list-item";
import { ListItemEmphasis } from "~/components/list-item-emphasis";
import { ListLayout } from "~/components/list-layout";
import { BlockSection } from "~/components/block-section";

export const usePosts = routeLoader$(Posts.listWithDetails);

export default component$(() => {
  const posts = usePosts();
  return (
    <main
      style={{
        padding: "4rem",
      }}
    >
      <BlockSection
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2em",
        }}
      >
        {posts.value.map((post, i) => {
          const content = <PostListItem {...post} />;
          return (
            <Fragment key={post.name}>
              {i ? (
                <>
                  <hr
                    style={css({
                      border: 0,
                      background: V.gray20,
                      "@media (prefers-color-scheme: dark)": {
                        background: V.gray80,
                      },
                      width: "100%",
                      height: "1px",
                    })}
                  />
                  {content}
                </>
              ) : (
                <ListLayout title="Latest post">
                  <ListItemEmphasis>{content}</ListItemEmphasis>
                </ListLayout>
              )}
            </Fragment>
          );
        })}
      </BlockSection>
    </main>
  );
});

import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import * as Markdown from "~/markdown";
import * as Pages from "~/data/pages";
import { Jumbotron } from "~/components/jumbotron";
import { BlockSection } from "~/components/block-section";

export const usePage = routeLoader$(async () => {
  const page = await Pages.getByName("about");
  const html = await Markdown.render(page.markdown);
  return { ...page, html };
});

export default component$(() => {
  const page = usePage();

  return (
    <main style={{ display: "flex", flexDirection: "column", gap: "2em" }}>
      <Jumbotron>
        <div
          q:slot="headline"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>About</div>
          <img
            src="https://github.com/nsaunders.png"
            alt="Nick Saunders"
            width="0"
            height="0"
            style={{
              width: "3em",
              height: "3em",
              borderRadius: "999px",
              objectFit: "cover",
            }}
          />
        </div>
      </Jumbotron>
      <BlockSection style={{ lineHeight: 1.5 }}>
        <div dangerouslySetInnerHTML={page.value.html} />
      </BlockSection>
    </main>
  );
});

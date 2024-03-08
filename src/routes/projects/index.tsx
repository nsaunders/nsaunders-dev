import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { BlockSection } from "~/components/block-section";
import { ListItemEmphasis } from "~/components/list-item-emphasis";
import { ListLayout } from "~/components/list-layout";
import { ProjectListItem } from "~/components/project-list-item";
import { css } from "~/css";
import * as Projects from "~/data/projects";

export const useProjects = routeLoader$(Projects.list);

export const head: DocumentHead = {
  title: "Projects",
  meta: [
    {
      name: "description",
      content:
        "Overview of my programming projects and open-source contributions",
    },
  ],
};

export default component$(() => {
  const projects = useProjects();

  return (
    <main
      style={css({
        margin: "4em 0",
        on: ($) => [
          $("@media (width < 640px)", {
            margin: "2em 0",
          }),
        ],
      })}
    >
      <BlockSection>
        <ListLayout title="Projects">
          <ul
            style={{
              listStyleType: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5em",
            }}
          >
            {projects.value.map((project) => (
              <li
                key={project.url}
                style={{
                  display: "grid",
                  minWidth: "40%",
                  flex: "1 1 calc((60ch - 100%) * 999)",
                }}
              >
                <ListItemEmphasis>
                  <ProjectListItem {...project} />
                </ListItemEmphasis>
              </li>
            ))}
          </ul>
        </ListLayout>
      </BlockSection>
    </main>
  );
});

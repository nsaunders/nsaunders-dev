import { z } from "@builder.io/qwik-city";
import * as cheerio from "cheerio";

const username = "nsaunders";

const projectSchema = z.object({
  url: z.string(),
  owner: z.string(),
  name: z.string(),
  description: z.string(),
  language: z.object({ name: z.string(), color: z.string() }),
  stars: z.number(),
  forks: z.number(),
});

export async function list() {
  const res = await fetch(`https://github.com/${username}`);
  const $ = cheerio.load(await res.text());
  return $(".pinned-item-list-item-content")
    .map(function () {
      const owner: string =
        $(this).find("a .owner").text().trim().replace(/\/$/, "") || username;
      const name: string = $(this).find("a .repo").text().trim();
      const description: string = $(this)
        .find(".pinned-item-desc")
        .text()
        .trim();
      const languageColor =
        $(this).find(".repo-language-color").css("background-color") || "black";
      const languageName = $(this)
        .find("[itemProp='programmingLanguage']")
        .text()
        .trim();
      const stars =
        parseInt($(this).find("a[href$='stargazers']").text().trim()) || 0;
      const forks =
        parseInt($(this).find("a[href$='forks']").text().trim()) || 0;
      return projectSchema.parse({
        url: `https://github.com/${owner}/${name}`,
        owner,
        name,
        description,
        language: { name: languageName, color: languageColor },
        stars,
        forks,
      });
    })
    .toArray();
}

/*
const getStory = ({ owner, name }: { owner: string; name: string }) =>
  Http.request
    .get(
      `https://raw.githubusercontent.com/nsaunders/writing/master/projects/${owner}/${name}.md`
    )
    .pipe(
      Http.client.fetch(),
      Effect.flatMap((res) => {
        switch (res.status) {
          case 404:
            return Effect.succeed(Option.none());
          default:
            return Effect.map(res.text, Option.some);
        }
      })
    );

export const printGetFeaturedError = flow(
  printListErrorBase,
  (error) => `Failed to get featured project. ${error}`
);

export type FeaturedProject = Projects[number] & { story: string };

export const getFeatured = () =>
  Effect.gen(function* (_) {
    const projects = yield* _(list());
    for (const project of projects) {
      const story = yield* _(getStory(project));
      if (Option.isSome(story)) {
        return Option.some({ ...project, story: story.value });
      }
    }
    return Option.none();
  });

  */

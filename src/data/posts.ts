import { z } from "@builder.io/qwik-city";
import matter from "gray-matter";

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  published: z.date(),
  tags: z.array(z.string()),
});

export async function get(name: string) {
  const res = await fetch(
    `https://raw.githubusercontent.com/nsaunders/writing/master/posts/${name}/index.md`
  );
  if (!res.ok) {
    throw new Error(`Request failed: ${res.statusText}`);
  }
  const { content, data } = matter(await res.text());
  return {
    content,
    discussionHref: `https://x.com/search?q=${encodeURIComponent(
      `https://nsaunders.dev/posts/${name}`
    )}`,
    editHref: `https://github.com/nsaunders/writing/edit/master/posts/${name}/index.md`,
    ...postSchema.parse(data),
  };
}

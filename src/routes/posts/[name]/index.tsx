import { component$ } from "@builder.io/qwik";
import {
  type StaticGenerateHandler,
  routeLoader$,
  z,
} from "@builder.io/qwik-city";

export const usePost = routeLoader$(async (requestEvent) => {
  const res = await fetch(
    `https://raw.githubusercontent.com/nsaunders/writing/master/posts/${requestEvent.params.name}/index.md`
  );
  if (!res.ok) {
    return requestEvent.fail(res.status, {
      errorMessage:
        res.status === 404
          ? "The requested post does not exist."
          : "An unexpected error occurred while retrieving the requested post.",
    });
  }
  return await res.text();
});

export default component$(() => {
  const post = usePost();
  return <div>{JSON.stringify(post)}</div>;
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

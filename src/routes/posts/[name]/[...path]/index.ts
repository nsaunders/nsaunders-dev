import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({
  params: { name, path },
  send,
  headers,
}) => {
  headers.set(
    "Location",
    `https://github.com/nsaunders/writing/raw/master/posts/${name}/${path}`
  );
  send(301, "");
};

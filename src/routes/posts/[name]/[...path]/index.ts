import type {
  RequestHandler,
  StaticGenerateHandler,
} from "@builder.io/qwik-city";
import { type Token, lexer } from "marked";
import * as Posts from "~/data/posts";

export const onGet: RequestHandler = async ({
  params: { name, path },
  status,
  getWritableStream,
  send,
  ...ctx
}) => {
  const content = await Posts.getResource({ name, path }, ctx);
  if (content) {
    status(200);
    content.pipeTo(getWritableStream());
  } else {
    send(200, "");
  }
};

export const onStaticGenerate: StaticGenerateHandler = async (ctx) => {
  return {
    params: (await Posts.listWithDetails(ctx)).flatMap(({ name, markdown }) =>
      getRefs(lexer(markdown)).map((path) => ({ name, path }))
    ),
  };

  function getRefs(tokens: Token[]) {
    return tokens.flatMap((token): string[] => {
      if (typeof token === "object") {
        if ("href" in token) {
          const { href } = token;
          if (!/^https?:/.test(href) && /^(\.\/)?[A-Za-z0-9]/.test(href)) {
            return [href];
          }
          return [];
        }

        if ("tokens" in token && token.tokens) {
          return getRefs(token.tokens);
        }
      }
      return [];
    });
  }
};

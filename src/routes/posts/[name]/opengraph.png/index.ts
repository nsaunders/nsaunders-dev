import type { StaticGenerateHandler } from "@builder.io/qwik-city";
import onGet from "./onGet";
import * as Posts from "~/data/posts";

export { onGet };

export const onStaticGenerate: StaticGenerateHandler = async (ctx) => {
  const params = await Posts.list(ctx);
  return { params };
};

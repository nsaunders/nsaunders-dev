import type { EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { z } from "@builder.io/qwik-city";

export const configureRequest = (
  req: RequestInit,
  { env }: { env: EnvGetter }
) => ({
  ...req,
  headers: {
    ...req.headers,
    Authorization: `Bearer ${z.string().parse(env.get("GH_ACCESS_TOKEN"))}`,
  },
});

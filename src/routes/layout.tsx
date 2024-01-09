import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { PageFooter } from "~/components/page-footer";
import { PageHeader } from "~/components/page-header";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  return (
    <>
      <PageHeader />
      <div style={{ marginBottom: "2em" }}>
        <Slot />
      </div>
      <PageFooter style={{ marginTop: "auto" }} />
    </>
  );
});

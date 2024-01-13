import { component$, Slot } from "@builder.io/qwik";
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";
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

export const head: DocumentHead = ({ head, url }) => ({
  title: `${head.title ? `${head.title} — ` : ""}nsaunders.dev`,
  meta: [
    ...(!head.title || head.meta.some(({ property }) => property === "og:title")
      ? []
      : [{ property: "og:title", content: head.title }]),
    ...(head.meta.some(({ property }) => property === "og:description")
      ? []
      : head.meta
          .filter((x) => x.name === "description")
          .map(({ content }) => ({ property: "og:description", content }))),
    ...(head.meta.some(({ property }) => property === "og:url")
      ? []
      : [{ property: "og:url", content: url.toString() }]),
    ...(head.meta.some(({ property }) => property === "og:site_name")
      ? []
      : [{ property: "og:site_name", content: "nsaunders.dev" }]),
    ...(head.meta.some(({ property }) => property === "twitter:creator")
      ? []
      : [{ property: "twitter:creator", content: "agilecoder" }]),
    ...(head.meta.some(({ property }) => property === "twitter:card") ||
    !head.meta.some(({ property }) => property === "og:image")
      ? []
      : [{ property: "twitter:card", content: "summary_large_image" }]),
  ],
});

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

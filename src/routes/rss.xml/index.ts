import { z, type RequestHandler } from "@builder.io/qwik-city";
import jsxtoxml from "jstoxml";
import * as Posts from "~/data/posts";

function withFallback(f: (d: Date) => string): (d: Date) => string {
  return function (d) {
    try {
      return f(d);
    } catch {
      try {
        return d.toISOString();
      } catch {
        return "Invalid date";
      }
    }
  };
}

const formatRFC822 = withFallback((date) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayOfWeek = daysOfWeek[date.getUTCDay()];
  const day =
    date.getUTCDate() < 10 ? "0" + date.getUTCDate() : date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hours =
    date.getUTCHours() < 10 ? "0" + date.getUTCHours() : date.getUTCHours();
  const minutes =
    date.getUTCMinutes() < 10
      ? "0" + date.getUTCMinutes()
      : date.getUTCMinutes();
  const seconds =
    date.getUTCSeconds() < 10
      ? "0" + date.getUTCSeconds()
      : date.getUTCSeconds();

  return `${dayOfWeek}, ${day} ${month} ${year} ${hours}:${minutes}:${seconds} GMT`;
});

export const onGet: RequestHandler = async ({ headers, env, send }) => {
  const posts = await Posts.listWithDetails({
    accessToken: z.string().parse(env.get("GH_ACCESS_TOKEN")),
  });

  headers.set("Content-Type", "application/xml");

  send(
    200,
    jsxtoxml.toXML(
      {
        _name: "rss",
        _attrs: {
          version: "2.0",
          "xmlns:dc": "http://purl.org/dc/elements/1.1/",
          "xmlns:content": "http://purl.org/rss/1.0/modules/content/",
          "xmlns:atom": "http://www.w3.org/2005/Atom",
        },
        _content: {
          channel: [
            [
              {
                title: "Blog — nsaunders.dev",
                description:
                  "Nick Saunders technical blog, focused on React, TypeScript, and frontend development",
                link: "https://nsaunders.dev/posts",
                image: {
                  url: "https://github.com/nsaunders.png",
                  title: "nsaunders.dev",
                  link: "https://nsaunders.dev/posts",
                },
                lastBuildDate: formatRFC822(new Date()),
                "atom:link": {
                  _attrs: {
                    href: "https://nsaunders.dev/rss.xml",
                    rel: "self",
                    type: "application/rss+xml",
                  },
                },
              },
            ],
            ...posts.map(({ title, description, name, published }) => ({
              item: [
                {
                  title,
                  description,
                  link: `https://nsaunders.dev/posts/${name}`,
                  pubDate: formatRFC822(published),
                },
                {
                  _name: "guid",
                  _attrs: {
                    isPermaLink: "true",
                  },
                  _content: `https://nsaunders.dev/posts/${name}`,
                },
              ],
            })),
          ],
        },
      },
      { header: true, indent: "  " }
    )
  );
};

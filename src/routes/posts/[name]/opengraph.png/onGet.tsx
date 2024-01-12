// @ts-ignore
import onest from "@fontsource/onest/files/onest-latin-400-normal.woff?arraybuffer";

import type { RequestHandler } from "@builder.io/qwik-city";
import { renderToString } from "@builder.io/qwik/server";
import satori from "satori";
import { html as satoriHTML } from "satori-html";
import * as resvg from "@resvg/resvg-js";
import * as V from "varsace";
import * as Posts from "~/data/posts";

const onGet: RequestHandler = async (requestEvent) => {
  const width = 1200;
  const height = 630;

  const { title, description } = await Posts.getByName(
    requestEvent.params.name,
    requestEvent
  );

  const { html } = await renderToString(
    <body>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: V.gray85,
          padding: "4em",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          fontSize: "24px",
          lineHeight: 1.25,
          color: V.white,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.666em",
          }}
        >
          <div style={{ fontSize: "2em" }}>{title}</div>
          <div style={{ fontSize: "1.333em", color: V.gray20 }}>
            {description}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img
            src="https://github.com/nsaunders.png"
            alt="Nick Saunders"
            width="64"
            height="64"
            style={{ borderRadius: 9999 }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>Nick Saunders</span>
            <span style={{ color: V.blue30 }}>nsaunders.dev</span>
          </div>
        </div>
      </div>
    </body>,
    { qwikLoader: { include: "never" } }
  );

  const jsx = satoriHTML(html.match(/<body[^>]*>(.*)?<\/body>/m)?.[1] || "");

  const svg = await satori(jsx, {
    fonts: [{ name: "Onest", data: onest, weight: 400, style: "normal" }],
    width,
    height,
  });

  const image = await resvg.renderAsync(svg);

  requestEvent.send(
    new Response(image.asPng(), {
      status: 200,
      headers: {
        "Content-Type": "image/png",
      },
    })
  );
};

export default onGet;

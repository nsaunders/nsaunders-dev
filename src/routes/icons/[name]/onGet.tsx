// @ts-ignore
import montserrat from "@fontsource/montserrat/files/montserrat-latin-400-normal.woff?arraybuffer";

import type { RequestHandler } from "@builder.io/qwik-city";
import { renderToString } from "@builder.io/qwik/server";
import satori from "satori";
import { html as satoriHTML } from "satori-html";
import * as resvg from "@resvg/resvg-js";
import * as V from "varsace";

const dimensions = {
  "icon-16x16.png": { width: 16, height: 16 },
  "icon-32x32.png": { width: 32, height: 32 },
  "apple-touch-icon.png": { width: 180, height: 180 },
  "android-chrome-192x192.png": { width: 192, height: 192 },
  "android-chrome-512x512.png": { width: 512, height: 512 },
};

const onGet: RequestHandler = async ({ params, send }) => {
  const { name } = params;

  if (!(name in dimensions)) {
    send(404, "Not found");
    return;
  }

  const { width, height } =
    name in dimensions
      ? dimensions[name as keyof typeof dimensions]
      : dimensions["icon-32x32.png"];

  const { html } = await renderToString(
    <body>
      <div
        style={{
          fontSize: `${Math.min(width, height) * 0.75}px`,
          background: `linear-gradient(0,${V.blue40},${V.blue60})`,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: V.white,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: `${height * 0.5}px`,
            left: `${width * -4}px`,
            width: `${width * 9}px`,
            height: `${height * 9}px`,
            background: V.blue80,
            borderRadius: "9999px",
            color: "transparent",
          }}
        >
          _
        </div>
        N
        <div
          style={{
            position: "absolute",
            width: `${width}px`,
            height: `${height}px`,
            top: 0,
            left: 0,
            boxShadow: `inset 0 0 0 ${Math.max(1, Math.round(height / 32))}px ${
              V.blue50
            }`,
            color: "transparent",
          }}
        >
          _
        </div>
      </div>
    </body>,
    { qwikLoader: { include: "never" } }
  );

  const jsx = satoriHTML(html.match(/<body[^>]*>(.*)?<\/body>/m)?.[1] || "");

  const svg = await satori(jsx, {
    fonts: [
      { name: "Montserrat", data: montserrat, weight: 400, style: "normal" },
    ],
    width,
    height,
  });

  const image = await resvg.renderAsync(svg);

  send(
    new Response(image.asPng(), {
      status: 200,
      headers: {
        "Content-Type": "image/png",
      },
    })
  );
};

export default onGet;

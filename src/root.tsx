import "./global.css";

import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import * as V from "varsace";
import { RouterHead } from "~/components/router-head";
import * as Theme from "~/theme";
import { css, hooks } from "~/css";

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <script
          dangerouslySetInnerHTML={`
            (function() {
              var theme = localStorage.getItem("theme");
              if (!~${JSON.stringify(Theme.options)}.indexOf(theme)) {
                theme = ${JSON.stringify(Theme.defaultOption)};
              }
              document.documentElement.setAttribute("data-theme", theme);
              window.addEventListener("load", function() {
                var switcher = document.getElementById(${JSON.stringify(
                  Theme.switcherId
                )});
                if (switcher instanceof HTMLSelectElement) {
                  switcher.value = theme;
                  switcher.addEventListener("change", function(e) {
                    var theme = e.target.value;
                    document.documentElement.setAttribute("data-theme", theme);
                    localStorage.setItem("theme", theme);
                  });
                }
              });
            })()
          `}
        />
        <style dangerouslySetInnerHTML={hooks} />
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body
        lang="en"
        style={css({
          fontFamily: "'Onest Variable', sans-serif",
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          lineHeight: 1.25,
          background: V.white,
          color: V.black,
          "@media (prefers-color-scheme: light)": {
            "--hook-light": "initial",
            "--hook-dark": "",
          },
          "@media (prefers-color-scheme: dark)": {
            "--hook-light": "",
            "--hook-dark": "initial",
            background: V.gray90,
            color: V.white,
          },
        })}
      >
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});

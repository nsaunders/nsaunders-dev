import { component$ } from "@builder.io/qwik";
import * as V from "varsace";
import { css } from "~/css";
import { ThemeSwitcher } from "./theme-switcher";
import { AnchorLink } from "./anchor";
import { useLocation } from "@builder.io/qwik-city";

export const PageHeader = component$(() => {
  const {
    url: { pathname },
  } = useLocation();
  return (
    <header
      style={css({
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1em",
        background: V.gray05,
        padding: "0.25em 1em",
        on: $ => [
          $("@media (prefers-color-scheme: dark)", {
            background: V.gray80,
          }),
        ],
      })}
    >
      <AnchorLink
        href="/"
        style={css({
          fontFamily: "'Montserrat Variable'",
          textTransform: "uppercase",
          fontSize: "1.6em",
          on: $ => [
            $("@media (width < 640px)", {
              fontSize: 0,
            }),
          ],
        })}
        selected
      >
        {/* eslint-disable qwik/jsx-img */}
        <img
          src="/icons/icon-32x32.png"
          alt="Nick Saunders"
          style={css({
            width: 32,
            height: 32,
            display: "none",
            on: $ => [
              $("@media (width < 640px)", {
                display: "unset",
              }),
            ],
          })}
        />
        {/* eslint-enable qwik/jsx-img */}
        <span
          style={css({
            display: "inline",
            on: $ => [
              $("@media (width < 640px)", {
                display: "none",
              }),
            ],
          })}
        >
          Nick Saunders
        </span>
      </AnchorLink>
      <div style={{ flex: 1 }} />
      <>
        {(
          [
            ["/posts", "Posts"],
            ["/projects", "Projects"],
            ["/about", "About"],
          ] as const
        ).map(([href, label]) => (
          <AnchorLink
            key={href}
            href={href}
            selected={pathname.startsWith(href)}
          >
            {label}
          </AnchorLink>
        ))}
      </>
      <hr
        style={css({
          border: 0,
          width: "1px",
          height: "2rem",
          background: V.gray20,
          on: $ => [
            $("@media (prefers-color-scheme: dark)", {
              background: V.gray60,
            }),
          ],
        })}
      />{" "}
      <ThemeSwitcher />
    </header>
  );
});

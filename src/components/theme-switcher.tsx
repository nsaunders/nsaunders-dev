import { component$ } from "@builder.io/qwik";
import * as V from "varsace";
import { css } from "~/css";
import * as Theme from "~/theme";
import * as Icon from "./icons";

export const ThemeSwitcher = component$(() => (
  <div style={{ display: "inline-flex" }}>
    <div
      style={css({
        margin: 0,
        display: "inline-flex",
        position: "relative",
        width: "3em",
        borderRadius: "999px",
        color: V.white,
        background: V.purple60,
        outlineColor: V.blue50,
        "@media (prefers-color-scheme: dark)": {
          background: V.yellow20,
          outlineColor: V.blue20,
          color: V.gray90,
        },
      })}
    >
      <div
        style={{
          position: "absolute",
          top: "calc(3em / 16)",
          right: "calc(3em / 16)",
          left: "calc(3em / 16)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={css({
            width: "1em",
            height: "1em",
            borderRadius: "999px",
            background: "currentColor",
            display: "block",
            "@media (prefers-color-scheme: dark)": { display: "none" },
          })}
        />
        <div
          style={css({
            color: V.yellow25,
            display: "contents",
            "@media (prefers-color-scheme: dark)": {
              display: "none",
            },
          })}
        >
          <Icon.Moon />
        </div>
        <div
          style={css({
            color: V.orange60,
            display: "contents",
            "@media (prefers-color-scheme: light)": {
              display: "none",
            },
          })}
        >
          <Icon.Sun />
        </div>
        <div
          style={css({
            width: "1em",
            height: "1em",
            borderRadius: "999px",
            background: "currentColor",
            display: "none",
            "@media (prefers-color-scheme: dark)": { display: "block" },
          })}
        />
      </div>
      <select
        id={Theme.switcherId}
        style={css({
          maxWidth: "100%",
          zIndex: 1,
          appearance: "none",
          background: "transparent",
          color: "transparent",
          border: 0,
          borderRadius: "999px",
          lineHeight: 1,
          padding: "calc(1em / 3) 2em calc(1em / 3) calc(2em / 3)",
          outlineStyle: "solid",
          outlineWidth: 0,
          outlineOffset: "2px",
          outlineColor: V.blue20,
          "@media (prefers-color-scheme: dark)": {
            outlineColor: V.blue50,
          },
          "&:focus-visible": {
            outlineWidth: "2px",
          },
        })}
      >
        {Theme.options.map((option) => (
          <option
            key={option}
            selected={option === Theme.defaultOption}
            style={{ background: V.white, color: V.black }}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  </div>
));

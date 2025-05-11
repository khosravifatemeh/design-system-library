import { TokenGroup, TokenGroupItem } from "./base/token-group";

export const background = TokenGroup.create({
  name: "Background",
  properties: ["background"],
  tokens: [
    "background",
    "background-subtle",
    "background-muted",
    "background-emphasized",
    "background-inverted",
    "background-panel",
    "background-error",
    "background-warning",
    "background-success",
    "background-info",
  ],
});

export const foreground = TokenGroup.create({
  name: "Foreground",
  properties: ["color"],
  tokens: [
    "foreground",
    "foreground-muted",
    "foreground-subtle",
    "foreground-inverted",
    "foreground-error",
    "foreground-warning",
    "foreground-success",
    "foreground-info",
  ],
});

export const border = TokenGroup.create({
  name: "Border",
  properties: ["border-color"],
  tokens: [
    "border",
    "border-muted",
    "border-subtle",
    "border-emphasized",
    "border-inverted",
    "border-error",
    "border-warning",
    "border-success",
    "border-info",
  ],
});

export const colorPalette = TokenGroup.create({
  name: "ColorPalette",
  properties: ["color", "background-color"],
  tokens: [
    {
      name: "gray",
      tokens: [
        "contrast",
        "fg",
        "subtle",
        "muted",
        "emphasized",
        "solid",
        "focus-ring",
      ],
    },
    {
      name: "red",
      tokens: [
        "contrast",
        "fg",
        "subtle",
        "muted",
        "emphasized",
        "solid",
        "focus-ring",
      ],
    },
    {
      name: "blue",
      tokens: [
        "contrast",
        "fg",
        "subtle",
        "muted",
        "emphasized",
        "solid",
        "focus-ring",
      ],
    },
    {
      name: "green",
      tokens: [
        "contrast",
        "fg",
        "subtle",
        "muted",
        "emphasized",
        "solid",
        "focus-ring",
      ],
    },
    {
      name: "orange",
      tokens: [
        "contrast",
        "fg",
        "subtle",
        "muted",
        "emphasized",
        "solid",
        "focus-ring",
      ],
    },
    {
      name: "yellow",
      tokens: [
        "contrast",
        "fg",
        "subtle",
        "muted",
        "emphasized",
        "solid",
        "focus-ring",
      ],
    },
    {
      name: "teal",
      tokens: [
        "contrast",
        "fg",
        "subtle",
        "muted",
        "emphasized",
        "solid",
        "focus-ring",
      ],
    },
    {
      name: "purple",
      tokens: [
        "contrast",
        "fg",
        "subtle",
        "muted",
        "emphasized",
        "solid",
        "focus-ring",
      ],
    },
    {
      name: "pink",
      tokens: [
        "contrast",
        "fg",
        "subtle",
        "muted",
        "emphasized",
        "solid",
        "focus-ring",
      ],
    },
    {
      name: "cyan",
      tokens: [
        "contrast",
        "fg",
        "subtle",
        "muted",
        "emphasized",
        "solid",
        "focus-ring",
      ],
    },
  ],
});
export const allColorGroup = TokenGroup.create({
  name: "All",
  tokens: [background, foreground, border, colorPalette],
});

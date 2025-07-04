import { TokenGroup } from "./base/token-group";

export const background = TokenGroup.create({
  name: "Background",
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
  tokens: [
    "gray-contrast",
    "gray-fg",
    "gray-subtle",
    "gray-muted",
    "gray-emphasized",
    "gray-solid",
    "gray-focus-ring",
    "red-contrast",
    "red-fg",
    "red-subtle",
    "red-muted",
    "red-emphasized",
    "red-solid",
    "red-focus-ring",
    "blue-contrast",
    "blue-fg",
    "blue-subtle",
    "blue-muted",
    "blue-emphasized",
    "blue-solid",
    "blue-focus-ring",
    "green-contrast",
    "green-fg",
    "green-subtle",
    "green-muted",
    "green-emphasized",
    "green-solid",
    "green-focus-ring",
    "orange-contrast",
    "orange-fg",
    "orange-subtle",
    "orange-muted",
    "orange-emphasized",
    "orange-solid",
    "orange-focus-ring",
    "yellow-contrast",
    "yellow-fg",
    "yellow-subtle",
    "yellow-muted",
    "yellow-emphasized",
    "yellow-solid",
    "yellow-focus-ring",
    "teal-contrast",
    "teal-fg",
    "teal-subtle",
    "teal-muted",
    "teal-emphasized",
    "teal-solid",
    "teal-focus-ring",
    "purple-contrast",
    "purple-fg",
    "purple-subtle",
    "purple-muted",
    "purple-emphasized",
    "purple-solid",
    "purple-focus-ring",
    "pink-contrast",
    "pink-fg",
    "pink-subtle",
    "pink-muted",
    "pink-emphasized",
    "pink-solid",
    "pink-focus-ring",
    "cyan-contrast",
    "cyan-fg",
    "cyan-subtle",
    "cyan-muted",
    "cyan-emphasized",
    "cyan-solid",
    "cyan-focus-ring",
  ],
});
export const allColorGroup = TokenGroup.create({
  name: "All",
  tokens: [background, foreground, border, colorPalette],
});

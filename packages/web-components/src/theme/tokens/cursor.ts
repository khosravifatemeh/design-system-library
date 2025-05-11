import { TokenGroup } from "./base/token-group";

export const cursorTokens = TokenGroup.create({
  name: "Cursor",
  properties: ["cursor"],
  tokens: [
    "cursor-button",
    "cursor-checkbox",
    "cursor-disabled",
    "cursor-menuitem",
    "cursor-option",
    "cursor-radio",
    "cursor-slider",
    "cursor-switch",
  ],
});

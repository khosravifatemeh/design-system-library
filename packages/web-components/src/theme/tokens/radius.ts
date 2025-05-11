import { TokenGroup } from "./base/token-group";

export const radiusTokens = TokenGroup.create({
  name: "Radius",
  properties: ["cursor"],
  tokens: [
    "radius-none",
    "radius-2xs",
    "radius-xs",
    "radius-sm",
    "radius-md",
    "radius-lg",
    "radius-xl",
    "radius-2xl",
    "radius-3xl",
    "radius-4xl",
    "radius-full",
  ],
});

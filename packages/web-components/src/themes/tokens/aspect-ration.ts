import { TokenGroup } from "./base/token-group";

export const aspectRatioTokens = TokenGroup.create({
  name: "AspectRatio",
  properties: [],
  tokens: [
    "aspect-ratio-square",
    "aspect-ratio-landscape",
    "aspect-ratio-portrait",
    "aspect-ratio-wide",
    "aspect-ratio-ultrawide",
    "aspect-ratio-golden",
  ],
});

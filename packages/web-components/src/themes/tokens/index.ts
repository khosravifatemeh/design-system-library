import { allColorGroup } from "./color";
import { Token } from "./base/token";
import { TokenGroup } from "./base/token-group";
import { convert, formats } from "./utils/token-format";
import { borderTokens } from "./borders";
import { cursorTokens } from "./cursor";
import { radiusTokens } from "./radius";
import { aspectRatioTokens } from "./aspect-ration";
import { blurTokens } from "./blurs";

export { allColorGroup, Token, TokenGroup, convert, formats };

export const a = [
  ...allColorGroup.getTokens().map((token) => {
    return {
      name: token.name,
      type: "color",
    };
  }),
  ...aspectRatioTokens.getTokens().map((token) => {
    return {
      name: token.name,
      type: "aspectRatio",
    };
  }),
  ...blurTokens.getTokens().map((token) => {
    return {
      name: token.name,
      type: "Blur",
    };
  }),
  ...borderTokens.getTokens().map((token) => {
    return {
      name: token.name,
      type: "Border",
    };
  }),
  ...cursorTokens.getTokens().map((token) => {
    return {
      name: token.name,
      type: "Cursor",
    };
  }),
  ...radiusTokens.getTokens().map((token) => {
    return {
      name: token.name,
      type: "Radius",
    };
  }),
];

export default {
  ...a,
  // layout
  // type
  // motion
};

// export const b = {
//   cursors,
//   radius,
//   borders,
//   blurs,
//   aspectRatios,
//   // layout
//   // type
//   // motion
// };

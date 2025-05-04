import { em, rem } from "layout";
import { fontSizes } from "./font-sizes";
import { fontWeights } from "./font-weights";

export const textStyles = {
  "2xs": { fontSize: fontSizes["2xs"], lineHeight: rem(12) },
  xs: { fontSize: fontSizes.xs, lineHeight: rem(16) },
  sm: { fontSize: fontSizes.sm, lineHeight: rem(20) },
  md: { fontSize: fontSizes.md, lineHeight: rem(24) },
  lg: { fontSize: fontSizes.lg, lineHeight: rem(28) },
  xl: { fontSize: fontSizes.xl, lineHeight: rem(30) },
  "2xl": { fontSize: fontSizes["2xl"], lineHeight: rem(32) },
  "3xl": { fontSize: fontSizes["3xl"], lineHeight: rem(38) },
  "4xl": {
    fontSize: fontSizes["4xl"],
    lineHeight: rem(44),
    letterSpacing: em(-0.4),
  },
  "5xl": {
    fontSize: fontSizes["5xl"],
    lineHeight: rem(60),
    letterSpacing: em(-0.4),
  },
  "6xl": {
    fontSize: fontSizes["6xl"],
    lineHeight: rem(72),
    letterSpacing: em(-0.4),
  },
  "7xl": {
    fontSize: fontSizes["7xl"],
    lineHeight: rem(92),
    letterSpacing: em(-0.4),
  },
  none: {},
  label: {
    fontSize: fontSizes.sm,
    lineHeight: rem(20),
    fontWeight: fontWeights.medium,
  },
};

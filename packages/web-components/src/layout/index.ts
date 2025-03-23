export const baseFontSize = 16;

/**
 * Convert a given px unit to a rem unit
 * @param {number} px
 * @returns {string}
 */
export function rem(px) {
  return `${px / baseFontSize}rem`;
}

/**
 * Convert a given px unit to a em unit
 * @param {number} px
 * @returns {string}
 */
export function em(px) {
  return `${px / baseFontSize}em`;
}

/**
 * Convert a given px unit to its string representation
 * @param {number} value - number of pixels
 * @returns {string}
 */
export function px(value) {
  return `${value}px`;
}

// Spacing
export const spacing01 = rem(2);
export const spacing02 = rem(4);
export const spacing03 = rem(6);
export const spacing04 = rem(8);
export const spacing05 = rem(10);
export const spacing06 = rem(12);
export const spacing07 = rem(14);
export const spacing08 = rem(16);
export const spacing09 = rem(18);
export const spacing10 = rem(20);
export const spacing11 = rem(24);
export const spacing12 = rem(28);
export const spacing13 = rem(32);
export const spacing14 = rem(36);
export const spacing15 = rem(40);
export const spacing16 = rem(44);
export const spacing17 = rem(48);
export const spacing18 = rem(56);
export const spacing19 = rem(64);
export const spacing20 = rem(80);
export const spacing21 = rem(96);
export const spacing22 = rem(112);
export const spacing23 = rem(128);
export const spacing24 = rem(144);
export const spacing25 = rem(160);
export const spacing26 = rem(176);
export const spacing27 = rem(192);
export const spacing28 = rem(208);
export const spacing29 = rem(224);
export const spacing30 = rem(240);
export const spacing31 = rem(256);
export const spacing32 = rem(288);
export const spacing33 = rem(320);
export const spacing34 = rem(384);
export const spacing = {
  spacing01,
  spacing02,
  spacing03,
  spacing04,
  spacing05,
  spacing06,
  spacing07,
  spacing08,
  spacing09,
  spacing10,
  spacing11,
  spacing12,
  spacing13,
  spacing14,
  spacing15,
  spacing16,
  spacing17,
  spacing18,
  spacing19,
  spacing20,
  spacing21,
  spacing22,
  spacing23,
  spacing24,
  spacing25,
  spacing26,
  spacing27,
  spacing28,
  spacing29,
  spacing30,
  spacing31,
  spacing32,
  spacing33,
  spacing34,
};

// Sizes
export const size3X = rem(224);
export const size2X = rem(256);
export const sizeXS = rem(320);
export const sizeSM = rem(384);
export const sizeMD = rem(448);
export const sizeLG = rem(512);
export const sizeXL = rem(576);
export const size2XL = rem(672);
export const size3XL = rem(768);
export const size4XL = rem(896);
export const size5XL = rem(1024);
export const size6XL = rem(1152);
export const size7XL = rem(1280);
export const size8XL = rem(1440);

// Sizes - Viewport and Content
export const sizeMax = "max-content";
export const sizeMin = "min-content";
export const sizeFit = "fit-content";
export const sizeProse = "60ch";
export const sizeFull = "100%";
export const sizeDvh = "100dvh";
export const sizeSvh = "100svh";
export const sizeLvh = "100lvh";
export const sizeDvw = "100dvw";
export const sizeSvw = "100svw";
export const sizeLvw = "100lvw";
export const sizeVw = "100vw";
export const sizeVh = "100vh";

// Fractional sizes
export const sizeHalf = "50%";
export const sizeOneThird = "33.333333%";
export const sizeTwoThirds = "66.666667%";
export const sizeOneFourth = "25%";
export const sizeThreeFourths = "75%";
export const sizeOneFifth = "20%";
export const sizeTwoFifths = "40%";
export const sizeThreeFifths = "60%";
export const sizeFourFifths = "80%";
export const sizeOneSixth = "16.666667%";
export const sizeTwoSixths = "33.333333%";
export const sizeThreeSixths = "50%";
export const sizeFourSixths = "66.666667%";
export const sizeFiveSixths = "83.333333%";
export const sizeOneTwelfth = "8.333333%";
export const sizeTwoTwelfths = "16.666667%";
export const sizeThreeTwelfths = "25%";
export const sizeFourTwelfths = "33.333333%";
export const sizeFiveTwelfths = "41.666667%";
export const sizeSixTwelfths = "50%";
export const sizeSevenTwelfths = "58.333333%";
export const sizeEightTwelfths = "66.666667%";
export const sizeNineTwelfths = "75%";
export const sizeTenTwelfths = "83.333333%";
export const sizeElevenTwelfths = "91.666667%";
export const sizes = {
  // Sizes with rem
  size3X: rem(224),
  size2X: rem(256),
  sizeXS: rem(320),
  sizeSM: rem(384),
  sizeMD: rem(448),
  sizeLG: rem(512),
  sizeXL: rem(576),
  size2XL: rem(672),
  size3XL: rem(768),
  size4XL: rem(896),
  size5XL: rem(1024),
  size6XL: rem(1152),
  size7XL: rem(1280),
  size8XL: rem(1440),

  // Viewport and Content
  sizeMax: "max-content",
  sizeMin: "min-content",
  sizeFit: "fit-content",
  sizeProse: "60ch",
  sizeFull: "100%",
  sizeDvh: "100dvh",
  sizeSvh: "100svh",
  sizeLvh: "100lvh",
  sizeDvw: "100dvw",
  sizeSvw: "100svw",
  sizeLvw: "100lvw",
  sizeVw: "100vw",
  sizeVh: "100vh",

  // Fractional Sizes
  sizeHalf: "50%",
  sizeOneThird: "33.333333%",
  sizeTwoThirds: "66.666667%",
  sizeOneFourth: "25%",
  sizeThreeFourths: "75%",
  sizeOneFifth: "20%",
  sizeTwoFifths: "40%",
  sizeThreeFifths: "60%",
  sizeFourFifths: "80%",
  sizeOneSixth: "16.666667%",
  sizeTwoSixths: "33.333333%",
  sizeThreeSixths: "50%",
  sizeFourSixths: "66.666667%",
  sizeFiveSixths: "83.333333%",
  sizeOneTwelfth: "8.333333%",
  sizeTwoTwelfths: "16.666667%",
  sizeThreeTwelfths: "25%",
  sizeFourTwelfths: "33.333333%",
  sizeFiveTwelfths: "41.666667%",
  sizeSixTwelfths: "50%",
  sizeSevenTwelfths: "58.333333%",
  sizeEightTwelfths: "66.666667%",
  sizeNineTwelfths: "75%",
  sizeTenTwelfths: "83.333333%",
  sizeElevenTwelfths: "91.666667%",
};

// Z-index
export const zIndexHide = -1;
export const zIndexBase = "0";
export const zIndexDocked = 10;
export const zIndexDropdown = 1000;
export const zIndexSticky = 1100;
export const zIndexBanner = 1200;
export const zIndexOverlay = 1300;
export const zIndexModal = 1400;
export const zIndexPopover = 1500;
export const zIndexSkipNav = 1600;
export const zIndexToast = 1700;
export const zIndexTooltip = 1800;

export const zIndices = {
  zIndexHide,
  zIndexBase,
  zIndexDocked,
  zIndexDropdown,
  zIndexSticky,
  zIndexBanner,
  zIndexOverlay,
  zIndexModal,
  zIndexPopover,
  zIndexSkipNav,
  zIndexToast,
  zIndexTooltip,
};

// base breakpoints
export const breakpoints = {
  breakpointSm: rem(480),
  breakpointMd: rem(768),
  breakpointLg: rem(1024),
  breakpointXl: rem(1280),
  breakpoint2xl: rem(1536),
};

type BreakpointKey = keyof typeof breakpoints;

export function breakpointUp(name: BreakpointKey): string {
  return `@media (min-width: ${breakpoints[name]})`;
}

export function breakpointDown(name: BreakpointKey): string {
  return `@media (max-width: ${breakpoints[name]})`;
}

export function breakpoint(name: BreakpointKey): string {
  return breakpointUp(name);
}

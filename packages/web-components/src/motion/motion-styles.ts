export const animationStyles = {
  slideFadeIn: {
    transformOrigin: "var(--transform-origin)",
    placement: {
      top: {
        animationName: "slideFromBottom, fadeIn",
      },
      bottom: {
        animationName: "slideFromTop, fadeIn",
      },
      left: {
        animationName: "slideFromLeft, fadeIn",
      },
      right: {
        animationName: "slideFromRight, fadeIn",
      },
    },
  },
  slideFadeOut: {
    transformOrigin: "var(--transform-origin)",
    placement: {
      top: {
        animationName: "slideToBottom, fadeOut",
      },
      bottom: {
        animationName: "slideToTop, fadeOut",
      },
      left: {
        animationName: "slideToRight, fadeOut",
      },
      right: {
        animationName: "slideToLeft, fadeOut",
      },
    },
  },
  scaleFadeIn: {
    transformOrigin: "var(--transform-origin)",
    animationName: "scaleIn, fadeIn",
  },
  scaleFadeOut: {
    transformOrigin: "var(--transform-origin)",
    animationName: "scaleOut, fadeOut",
  },
};

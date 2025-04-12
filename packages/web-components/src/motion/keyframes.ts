export const keyframes = {
  spin: {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },

  pulse: {
    "50%": { opacity: "0.5" },
  },

  ping: {
    "75%, 100%": {
      transform: "scale(2)",
      opacity: "0",
    },
  },

  bounce: {
    "0%, 100%": {
      transform: "translateY(-25%)",
      animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
    },
    "50%": {
      transform: "none",
      animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
    },
  },

  bgPosition: {
    from: { backgroundPosition: "var(--animate-from, 1rem) 0" },
    to: { backgroundPosition: "var(--animate-to, 0) 0" },
  },

  position: {
    from: {
      insetInlineStart: "var(--animate-from-x)",
      insetBlockStart: "var(--animate-from-y)",
    },
    to: {
      insetInlineStart: "var(--animate-to-x)",
      insetBlockStart: "var(--animate-to-y)",
    },
  },

  circularProgress: {
    "0%": {
      strokeDasharray: "1, 400",
      strokeDashoffset: "0",
    },
    "50%": {
      strokeDasharray: "400, 400",
      strokeDashoffset: "-100%",
    },
    "100%": {
      strokeDasharray: "400, 400",
      strokeDashoffset: "-260%",
    },
  },

  expandHeight: {
    from: { height: "0" },
    to: { height: "var(--height)" },
  },

  collapseHeight: {
    from: { height: "var(--height)" },
    to: { height: "0" },
  },

  expandWidth: {
    from: { width: "0" },
    to: { width: "var(--width)" },
  },

  collapseWidth: {
    from: { height: "var(--width)" },
    to: { height: "0" },
  },

  fadeIn: {
    from: { opacity: "0" },
    to: { opacity: 1 },
  },

  fadeOut: {
    from: { opacity: 1 },
    to: { opacity: "0" },
  },

  slideFromLeftFull: {
    from: { translate: "-100% 0" },
    to: { translate: "0 0" },
  },

  slideFromRightFull: {
    from: { translate: "100% 0" },
    to: { translate: "0 0" },
  },

  slideFromTopFull: {
    from: { translate: "0 -100%" },
    to: { translate: "0 0" },
  },

  slideFromBottomFull: {
    from: { translate: "0 100%" },
    to: { translate: "0 0" },
  },

  slideToLeftFull: {
    from: { translate: "0 0" },
    to: { translate: "-100% 0" },
  },

  slideToRightFull: {
    from: { translate: "0 0" },
    to: { translate: "100% 0" },
  },

  slideToTopFull: {
    from: { translate: "0 0" },
    to: { translate: "0 -100%" },
  },

  slideToBottomFull: {
    from: { translate: "0 0" },
    to: { translate: "0 100%" },
  },

  slideFromTop: {
    "0%": { translate: "0 -0.5rem" },
    to: { translate: "0" },
  },

  slideFromBottom: {
    "0%": { translate: "0 0.5rem" },
    to: { translate: "0" },
  },

  slideFromLeft: {
    "0%": { translate: "-0.5rem 0" },
    to: { translate: "0" },
  },

  slideFromRight: {
    "0%": { translate: "0.5rem 0" },
    to: { translate: "0" },
  },

  slideToTop: {
    "0%": { translate: "0" },
    to: { translate: "0 -0.5rem" },
  },

  slideToBottom: {
    "0%": { translate: "0" },
    to: { translate: "0 0.5rem" },
  },

  slideToLeft: {
    "0%": { translate: "0" },
    to: { translate: "-0.5rem 0" },
  },

  slideToRight: {
    "0%": { translate: "0" },
    to: { translate: "0.5rem 0" },
  },

  scaleIn: {
    from: { scale: "0.95" },
    to: { scale: "1" },
  },

  scaleOut: {
    from: { scale: "1" },
    to: { scale: "0.95" },
  },
};

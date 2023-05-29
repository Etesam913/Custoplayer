export const volumeBar1Animation = {
  init: { opacity: 0, width: 0 },
  anim: { opacity: 1, width: 56 },
  exit: { opacity: 0, width: 0 },
};

export const volumeBar2Animation = {
  init: { opacity: 0, zIndex: 2 },
  anim: { opacity: 1, zIndex: 2 },
  exit: { opacity: 0, zIndex: 2 },
};

export const controlsBarOpacityAnimation = {
  init: { opacity: 0.01 },
  anim: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

export const controlsBarMovementAnimation = {
  init: { y: 35, opacity: 0 },
  anim: { y: 0, opacity: 1 },
  exit: { y: 45, opacity: 0 },
};

export const progressBar1ScrubberAnimation = {
  init: { scale: 1 },
  anim: (shouldAnimate: boolean) => ({
    scale: shouldAnimate ? 1.15 : 1,
  }),
};

export const volumeBar1ScrubberAnimation = {
  init: { scale: 1 },
  anim: (shouldAnimate: boolean) => ({
    scale: shouldAnimate ? 1.15 : 1,
  }),
};

export const volumeBar2ScrubberAnimation = {
  init: { scale: 1 },
  anim: (shouldAnimate: boolean) => ({
    scale: shouldAnimate ? 1.15 : 1,
  }),
};

export const playIndicatorAnimation = {
  anim: (shouldShow: boolean) => ({
    scale: shouldShow ? 1 : 0.25,
    opacity: shouldShow ? 1 : 0,
    transition: {
      opacity: { duration: 0.25 },
      scale: {
        type: 'spring',
        damping: 10,
        mass: 0.75,
        stiffness: 160,
      },
    },
  }),
};

export const subtitleAnimation = {
  init: (shouldShow: boolean) => ({
    opacity: 0,
    bottom: shouldShow ? 55 : 10,
  }),
  anim: (shouldShow: boolean) => ({
    opacity: 1,
    bottom: shouldShow ? 55 : 10,
  }),
  exit: {
    opacity: 0,
  },
};

export const subtitleTransition = {
  opacity: { duration: 0.1 },
  bottom: {
    type: 'spring',
    damping: 10,
    mass: 0.75,
    stiffness: 160,
  },
};

export const volumeBar1Animation = {
  init: { opacity: 0, width: 0 },
  anim: { opacity: 1, width: 56 },
  exit: { opacity: 0, width: 0 },
};

export const volumeBar2Animation = {
  init: { opacity: 0 },
  anim: { opacity: 1 },
  exit: { opacity: 0 },
};

export const controlsBarOpacityAnimation = {
  init: { opacity: 0 },
  anim: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

export const controlsBarMovementAnimation = {
  init: { y: 35, opacity: 0 },
  anim: { y: 0, opacity: 1 },
  exit: { y: 45, opacity: 0 },
};

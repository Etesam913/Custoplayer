import { PlayState } from './atoms';

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
  init: { height: '0.85rem', width: '0.85rem' },
  anim: (shouldAnimate: boolean) => ({
    height: shouldAnimate ? '1rem' : '0.85rem',
    width: shouldAnimate ? '1rem' : '0.85rem',
  }),
};

export const volumeBar1ScrubberAnimation = {
  init: { height: '0.75rem', width: '0.75rem' },
  anim: (shouldAnimate: boolean) => ({
    height: shouldAnimate ? '0.85rem' : '0.75rem',
    width: shouldAnimate ? '0.85rem' : '0.75rem',
  }),
};

export const volumeBar2ScrubberAnimation = {
  init: { height: '0.825rem', width: '0.825rem' },
  anim: (shouldAnimate: boolean) => ({
    height: shouldAnimate ? '0.925rem' : '0.825rem',
    width: shouldAnimate ? '0.925rem' : '0.825rem',
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

import { CustoplayerItem, CustoplayerValues } from '@root/types';
import { atom } from 'jotai';

/* 
  Scope is required to prevent two custoplayer's
  from sharing the same atoms
*/
export const myScope = Symbol();
export const draggableSymbol = Symbol('draggable');
export const videoElemAtom = atom<HTMLVideoElement | null>(null);

export const videoContainerAtom = atom<HTMLDivElement | null>(null);
export const setVideoContainerAtom = atom(
  null,
  (_, set, update: HTMLDivElement) => {
    set(videoContainerAtom, update);
  },
);

// Video Play State
export enum PlayState {
  paused,
  playing,
  ended,
}
export const isSeekingAtom = atom(false);
export const playStateAtom = atom<PlayState>(0);

// Controls Bar
export const showControlsBarAtom = atom(false);

// Video Dimensions
export const videoDimensionsObserverAtom = atom<ResizeObserver | null>(null);
export const videoDimensionsAtom = atom<{ height: number; width: number }>({
  height: 0,
  width: 0,
});

export const valuesAtom = atom<CustoplayerValues>({
  src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
});

// Rendering Items
export const itemsAtom = atom<(CustoplayerItem | undefined)[]>([]);

// Progress Bar
export const progressAtom = atom(0);
export const progressStrAtom = atom((get) => {
  const progress = get(progressAtom);
  return parseFloat((progress * 100).toFixed(1)) + '%';
});
export const isProgressDraggingAtom = atom(false);

// Volume Bar
export const volumeAtom = atom(0.5);
export const volumeStrAtom = atom((get) => {
  const volume = get(volumeAtom);
  return parseFloat((volume * 100).toFixed(1)) + '%';
});

export type isVolumeDraggingType = 'horizontal' | 'vertical' | false;
export const isVolumeDraggingAtom = atom<isVolumeDraggingType>(false);

// Timeout
export const controlsBarTimeoutAtom = atom<null | NodeJS.Timeout>(null);
export const isSeekingTimeoutAtom = atom<null | NodeJS.Timeout>(null);

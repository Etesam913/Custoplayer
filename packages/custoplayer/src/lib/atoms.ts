import {
  CustoplayerItem,
  CustoplayerValues,
  videoQualitiesAtomType,
} from '@root/lib/types';
import { atom } from 'jotai';
import { formatTime } from './utils';
import { ComponentPropsWithoutRef } from 'react';

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

export const videoAttributesAtom = atom<ComponentPropsWithoutRef<'video'>>({});

// Video Play State
export enum PlayState {
  paused,
  playing,
  ended,
}
export const isSeekingAtom = atom(false);
export const playStateAtom = atom<PlayState>(0);

// Video Text
export const currentTimeAtom = atom(0);
export const formattedCurrentTimeAtom = atom((get) => {
  return formatTime(get(currentTimeAtom));
});

export const durationAtom = atom(0);
export const formattedDurationAtom = atom((get) => {
  return formatTime(get(durationAtom));
});

// Playback Speed
export const playbackSpeedAtom = atom(1);

// Keyboard Navigation
export const focusedItemAtom = atom<
  'volumeBar1' | 'volumeBar2' | 'progressBar' | null
>(null);

// Subtitles
export const currentSubtitleAtom = atom<VTTCue | null>(null);
export const subtitlesAtom = atom<Array<TextTrack> | null>(null);
export const currentTextTrackAtom = atom<TextTrack | null>(null);

// Video Quality
export const currentQualityAtom = atom(1080);
export const possibleQualities = new Set([
  144, 240, 360, 480, 720, 1080, 1440, 2160,
]);

export const videoQualitiesAtom = atom<videoQualitiesAtomType>({
  2160: null,
  1440: null,
  1080: null,
  720: null,
  480: null,
  360: null,
  240: null,
  144: null,
});

// Controls Bar
export const showControlsBarAtom = atom(false);

// Video Dimensions
export const videoDimensionsObserverAtom = atom<ResizeObserver | null>(null);
export const videoDimensionsAtom = atom<{ height: number; width: number }>({
  height: 0,
  width: 0,
});

export const valuesAtom = atom<CustoplayerValues>({});

// Rendering Items
export const itemsAtom = atom<(CustoplayerItem | undefined)[]>([]);

// Progress Bar
export const progressAtom = atom(0);
export const progressStrAtom = atom((get) => {
  const progress = get(progressAtom);
  return parseFloat((progress * 100).toFixed(1)) + '%';
});
export const isProgressDraggingAtom = atom(false);
export const progressBufferPercentAtom = atom(0);

// Preview Tooltips
export const previewTooltipHoveredTimeAtom = atom(0);
export const previewTooltipStrAtom = atom((get) => {
  return formatTime(get(previewTooltipHoveredTimeAtom));
});
export const previewTooltipPositionAtom = atom(0);
export const previewTooltipThumbnailsAtom = atom<TextTrackCueList | null>(null);

// Volume Bar
export const volumeAtom = atom(1);
export const volumeStrAtom = atom((get) => {
  const volume = get(volumeAtom);
  return parseFloat((volume * 100).toFixed(1)) + '%';
});
export const isMutedAtom = atom(false);

export type isVolumeDraggingType = 'horizontal' | 'vertical' | false;
export const isVolumeDraggingAtom = atom<isVolumeDraggingType>(false);

// Timeout
export const controlsBarTimeoutAtom = atom<null | NodeJS.Timeout>(null);
export const isSeekingTimeoutAtom = atom<null | NodeJS.Timeout>(null);

// Fullscreen Button
export const isFullscreenAtom = atom(false);

import {
  CustoplayerItem,
  FullscreenItem,
  PlayButtonItem,
  ProgressBarItem,
  TimeItem,
  VolumeItem,
} from '@root/types';
import { SetStateAction } from 'react';
import PlayButtons from './components/PlayButtons';
import ProgressBars from './components/ProgressBars';
import VolumeButtons from './components/VolumeButtons';
import { isVolumeDraggingType, previewTooltipWidth } from '@root/lib/atoms';
import CurrentTime from './components/CurrentTime';
import Duration from './components/Duration';
import FullscreenButtons from './components/FullscreenButtons';

export const debounce = (fn: (...args: any[]) => void, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export const throttle = (fn: (...args: any[]) => void, ms = 300) => {
  let isThrottled = false,
    savedArgs: any[] | null,
    savedThis: any;

  function wrapper(...args: any[]) {
    if (isThrottled) {
      savedArgs = args.slice(1);
      savedThis = args[0];
      return;
    }

    fn.apply(args[0], args.slice(1));

    isThrottled = true;

    setTimeout(function () {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
};

// https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
export function isPlayButton(
  curItem: CustoplayerItem,
): curItem is PlayButtonItem {
  return (curItem as PlayButtonItem).id.startsWith('playButton');
}

export function isProgressBar(
  curItem: CustoplayerItem,
): curItem is ProgressBarItem {
  return (curItem as ProgressBarItem).id.startsWith('progressBar');
}

export function isVolume(curItem: CustoplayerItem): curItem is VolumeItem {
  return (
    (curItem as VolumeItem).id.startsWith('volumeButton') &&
    (curItem as VolumeItem).barId !== undefined
  );
}

export function isCurrentTime(curItem: CustoplayerItem): curItem is TimeItem {
  return (curItem as TimeItem).id === 'currentTime';
}

export function isDuration(curItem: CustoplayerItem): curItem is TimeItem {
  return (curItem as TimeItem).id === 'duration';
}

export function isFullscreen(
  curItem: CustoplayerItem,
): curItem is FullscreenItem {
  return (curItem as FullscreenItem).id.startsWith('fullscreenButton');
}

export function renderItemFromData(curItem: CustoplayerItem) {
  if (isPlayButton(curItem)) return <PlayButtons item={curItem} />;
  else if (isProgressBar(curItem)) return <ProgressBars item={curItem} />;
  else if (isVolume(curItem)) return <VolumeButtons item={curItem} />;
  else if (isCurrentTime(curItem)) return <CurrentTime />;
  else if (isDuration(curItem)) return <Duration />;
  else if (isFullscreen(curItem)) return <FullscreenButtons item={curItem} />;
}

export function handlePlayState(video: HTMLVideoElement | null) {
  if (video === null) return;
  const mobileDebug = document.getElementById('mobile-debug');
  const isPlaying = !video.paused && !video.ended && video.currentTime > 0;

  if (isPlaying) {
    if (mobileDebug) mobileDebug.innerText = 'paused';
    video.pause();
  } else if (video.paused) {
    if (mobileDebug) mobileDebug.innerText = 'playing';
    video.play();
  } else if (video.ended) {
    if (mobileDebug) mobileDebug.innerText = 'playing';
    video.play();
  }
}

export function handleKeyPress(
  e: React.KeyboardEvent<HTMLDivElement>,
  video: HTMLVideoElement | null,
) {
  if (e.key === ' ' || e.key === 'k') {
    e.preventDefault();
    if (video !== null) handlePlayState(video);
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    e.preventDefault();
    if (video !== null) {
      let newTime = video.currentTime;
      if (e.key === 'ArrowLeft') {
        newTime -= 5;
      } else {
        newTime += 5;
      }
      video.currentTime = clamp(newTime, 0, video.duration);
    }
  }
}

export function getSvgPath(path: string, strokeWidth = '1.8') {
  return (
    <path
      d={path}
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  );
}

export function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

export type BarMouseEvent =
  | MouseEvent
  | React.MouseEvent<HTMLDivElement, MouseEvent>
  | React.MouseEvent<HTMLButtonElement, MouseEvent>;

function getMousePos(
  mousePos: BarMouseEvent,
  callback: (a: BarMouseEvent, b: DOMRect) => void,
  videoContainer: HTMLDivElement | null,
) {
  // TODO: Fix bug where drag goes into dev tools
  const videoContainerRect = videoContainer?.getBoundingClientRect();
  if (videoContainerRect) {
    callback(mousePos, videoContainerRect);
  }
}

export function barMouseEvent(
  e: BarMouseEvent,
  mouseMoveCallback: (a: BarMouseEvent, b: DOMRect) => void,
  videoContainer: HTMLDivElement | null,
  setIsDragging:
    | ((update: SetStateAction<boolean>) => void)
    | ((update: SetStateAction<isVolumeDraggingType>) => void),
) {
  mouseMove(e);
  e.stopPropagation();

  function mouseMove(e: BarMouseEvent) {
    if (e.target) {
      getMousePos(e, mouseMoveCallback, videoContainer);
    }
  }

  function cleanUpDocumentEvents() {
    setIsDragging(false);
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', cleanUpDocumentEvents);
  }

  document.addEventListener('mousemove', mouseMove);
  document.addEventListener('mouseup', cleanUpDocumentEvents);
}

export function formatTime(durationInSeconds: number) {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds - hours * 3600) / 60);
  const seconds = Math.floor(durationInSeconds - hours * 3600 - minutes * 60);

  let formattedTime = '';

  if (hours > 0) {
    formattedTime += `${hours}:`;
  }

  if (minutes < 10) {
    formattedTime += `0${minutes}:`;
  } else {
    formattedTime += `${minutes}:`;
  }

  if (seconds < 10) {
    formattedTime += `0${seconds}`;
  } else {
    formattedTime += `${seconds}`;
  }

  return formattedTime;
}

export function adjustPreviewTootipPos(
  updatedMousePos: number,
  videoDimensions: { height: number; width: number },
) {
  let leftEndOfTooltip = updatedMousePos;
  const distFromLeft = 32;
  const distFromRight = 36;

  leftEndOfTooltip = Math.max(leftEndOfTooltip, distFromLeft);
  leftEndOfTooltip = Math.min(
    leftEndOfTooltip,
    videoDimensions.width - distFromRight,
  );

  return leftEndOfTooltip;
}

export function getLargestProgressBarMousePos(
  videoContainerRect: DOMRect,
  progressBarRect: DOMRect,
) {
  const distLeftOfProgressBar = progressBarRect.left - videoContainerRect.left;
  const distRightOfProgressBar = Math.abs(
    progressBarRect.right - videoContainerRect.right,
  );
  const largestProgressBarMousePos =
    videoContainerRect.width - distLeftOfProgressBar - distRightOfProgressBar;
  return [
    largestProgressBarMousePos,
    distLeftOfProgressBar,
    distRightOfProgressBar,
  ];
}

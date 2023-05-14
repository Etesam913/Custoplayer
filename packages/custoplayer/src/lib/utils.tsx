import {
  CustoplayerItem,
  FullscreenButtonItem,
  PlayButtonItem,
  ProgressBarItem,
  SettingsButtonItem,
  TimeItem,
  VolumeItem,
} from '@root/lib/types';
import { SetStateAction } from 'react';
import { isVolumeDraggingType, previewTooltipWidth } from '@root/lib/atoms';
import Color from 'color';

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

export function isSettingsButton(
  curItem: CustoplayerItem,
): curItem is SettingsButtonItem {
  return (curItem as SettingsButtonItem).id.startsWith('settingsButton');
}

export function isProgressBar(
  curItem: CustoplayerItem,
): curItem is ProgressBarItem {
  return (curItem as ProgressBarItem).id.startsWith('progressBar');
}

export function isVolumeComponent(
  curItem: CustoplayerItem,
): curItem is VolumeItem {
  return (curItem as VolumeItem).id.startsWith('volumeButton');
}

export function isCurrentTime(curItem: CustoplayerItem): curItem is TimeItem {
  return (curItem as TimeItem).id === 'currentTime';
}

export function isDuration(curItem: CustoplayerItem): curItem is TimeItem {
  return (curItem as TimeItem).id === 'duration';
}

export function isFullscreenButton(
  curItem: CustoplayerItem,
): curItem is FullscreenButtonItem {
  return (curItem as FullscreenButtonItem).id.startsWith('fullscreenButton');
}

/**
  Changes the play state of the video.
  This is ran when the user clicks the video
  or presses the spacebar or k key
*/
export function handlePlayState(video: HTMLVideoElement | null) {
  if (video === null) return;
  const isPlaying = !video.paused && !video.ended && video.currentTime > 0;

  if (isPlaying) {
    //if (mobileDebug) mobileDebug.innerText = 'paused';
    video.pause();
  } else if (video.paused) {
    //if (mobileDebug) mobileDebug.innerText = 'playing';
    video.play();
  } else if (video.ended) {
    //if (mobileDebug) mobileDebug.innerText = 'playing';
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

/**
  Clamps val in between min and max
*/
export function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

export type BarMouseEvent =
  | MouseEvent
  | TouchEvent
  | React.MouseEvent<HTMLDivElement, MouseEvent>
  | React.MouseEvent<HTMLButtonElement, MouseEvent>
  | React.TouchEvent<HTMLDivElement>
  | React.TouchEvent<HTMLButtonElement>;

type MouseMoveCallback = (a: BarMouseEvent, b: DOMRect) => void;

function getMousePos(
  mousePos: BarMouseEvent,
  callback: MouseMoveCallback,
  videoContainer: HTMLDivElement | null,
) {
  // TODO: Fix bug where drag goes into dev tools
  const videoContainerRect = videoContainer?.getBoundingClientRect();
  if (videoContainerRect) {
    callback(mousePos, videoContainerRect);
  }
}

/**
  Runs when the user mousedown/touchstart on the
  progress or volume bar.

  The function runs sthe mouseMoveCallback function
  when the mouse moves while the mouse is down as well
*/
export function barMouseDown(
  e: BarMouseEvent,
  mouseMoveCallback: MouseMoveCallback,
  videoContainer: HTMLDivElement | null,
  setIsDragging:
    | ((update: SetStateAction<boolean>) => void)
    | ((update: SetStateAction<isVolumeDraggingType>) => void),
  isTouchscreen: boolean,
) {
  mouseMove(e);
  e.stopPropagation();

  function mouseMove(e: BarMouseEvent) {
    if (isTouchscreen) e.preventDefault();
    if (e.target) {
      getMousePos(e, mouseMoveCallback, videoContainer);
    }
  }

  function cleanUpDocumentEvents() {
    setIsDragging(false);
    if (isTouchscreen) {
      document.removeEventListener('touchmove', mouseMove);
      document.removeEventListener('touchend', cleanUpDocumentEvents);
    } else {
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', cleanUpDocumentEvents);
    }
  }
  if (isTouchscreen) {
    document.addEventListener('touchmove', mouseMove, { passive: false });
    document.addEventListener('touchend', cleanUpDocumentEvents);
  } else {
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', cleanUpDocumentEvents);
  }
}

export function handleProgressBarMouseMove(
  e: BarMouseEvent,
  videoContainerRect: DOMRect,
  isProgressDragging: boolean,
  progressBarRef: React.MutableRefObject<HTMLDivElement | null>,
  videoContainer: HTMLDivElement | null,
  videoElem: HTMLVideoElement | null,
  setProgress: (update: SetStateAction<number>) => void,
  setIsProgressDragging: (update: SetStateAction<boolean>) => void,
  setTooltipStr: (update: SetStateAction<string>) => void,
  setPreviewTooltipPosition: (update: SetStateAction<number>) => void,
) {
  setIsProgressDragging(true);
  if (progressBarRef && progressBarRef.current) {
    let xPos = 0;
    if (isTouchscreenFunc(e)) xPos = e.touches[0].clientX;
    else if (isMouseFunc(e)) xPos = e.clientX;
    const progressBarRect = progressBarRef.current.getBoundingClientRect();
    const [largestProgressBarMousePos, distLeftOfProgressBar, _] =
      getLargestProgressBarMousePos(videoContainerRect, progressBarRect);

    const updatedMousePos = xPos - videoContainerRect.left;

    showPreviewThumbnail(
      e,
      isProgressDragging,
      progressBarRef,
      videoContainer,
      videoElem,
      setTooltipStr,
      setPreviewTooltipPosition,
    );
    const adjustedMousePos = updatedMousePos - distLeftOfProgressBar;
    const clampedMousePos = clamp(
      adjustedMousePos,
      0,
      largestProgressBarMousePos,
    );

    const ratio = clampedMousePos / progressBarRef.current.clientWidth;
    if (videoElem && videoElem.duration) {
      const currentTime = videoElem.duration * ratio;
      videoElem.currentTime = currentTime;
      setTooltipStr(formatTime(currentTime));
    }

    setProgress(ratio);
  }
}

/**
  Shows the preview thumbnail when mouse is over progress bar
*/
export function showPreviewThumbnail(
  e: BarMouseEvent,
  isProgressDragging: boolean,
  progressBarRef: React.MutableRefObject<HTMLDivElement | null>,
  videoContainer: HTMLDivElement | null,
  videoElem: HTMLVideoElement | null,
  setTooltipStr: (update: SetStateAction<string>) => void,
  setPreviewTooltipPosition: (update: SetStateAction<number>) => void,
) {
  if (
    isProgressDragging ||
    !progressBarRef ||
    !progressBarRef.current ||
    !videoContainer
  )
    return;
  let xPos = 0;
  if (isTouchscreenFunc(e)) xPos = e.touches[0].clientX;
  else if (isMouseFunc(e)) xPos = e.clientX;
  const progressBarRect = progressBarRef.current.getBoundingClientRect();
  const widthOfItemsToLeftOfProgressBar =
    progressBarRef.current.getBoundingClientRect().left -
    videoContainer?.getBoundingClientRect().left;
  const widthOfItemsToRightOfProgressBar =
    videoContainer?.getBoundingClientRect().right -
    progressBarRef.current.getBoundingClientRect().right;
  const defaultHoverPos = xPos - progressBarRect.left;
  let hoverPos = xPos - progressBarRect.left - previewTooltipWidth / 2;
  const modifiedUpperBound =
    progressBarRef.current?.clientWidth -
    previewTooltipWidth / 2 +
    widthOfItemsToRightOfProgressBar;
  const maxHoverPos =
    progressBarRef.current.clientWidth - previewTooltipWidth / 2;
  const minHoverPos = Math.max(
    (-1 * previewTooltipWidth) / 2,
    -1 * widthOfItemsToLeftOfProgressBar,
  );

  if (defaultHoverPos > modifiedUpperBound) {
    hoverPos = modifiedUpperBound - previewTooltipWidth / 2;
  }
  hoverPos = clamp(hoverPos, minHoverPos, maxHoverPos);
  setPreviewTooltipPosition(hoverPos);

  const leftDist = progressBarRef.current.getBoundingClientRect().left;
  const timePos = xPos - leftDist;
  if (videoElem && videoElem.duration) {
    const ratio = clamp(timePos / progressBarRef.current.clientWidth, 0, 1);
    const currentTime = videoElem.duration * ratio;
    setTooltipStr(formatTime(currentTime));
  }
}

/**
  Formats time for currentTime and duration components.
  ex: 120 -> 2:00
*/
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

/**
  Used to determine if the device is a
  touchscreen by checking if TouchEvent
  exists
*/
export function isTouchscreenFunc(
  event: BarMouseEvent,
): event is React.TouchEvent<HTMLDivElement> {
  return (event as React.TouchEvent<HTMLDivElement>).touches !== undefined;
}

/**
  Used to determine if the device is not a
  touchscreen by checking if MouseEvent
  exists
*/
export function isMouseFunc(
  event: BarMouseEvent,
): event is React.MouseEvent<HTMLDivElement> {
  return (event as React.MouseEvent<HTMLDivElement>).clientX !== undefined;
}

export function isTouchscreen() {
  // Check if the device supports touch events
  if ('ontouchstart' in window || navigator.maxTouchPoints) {
    return true;
  }
  return false;
}

/**
  Lightens a color by using the Color.js library
  Used for setting default progressColor on progressBar
*/
export function lightenColor(color: string | undefined) {
  const lightenedColor = Color(color).lighten(0.3);
  return lightenedColor;
}

export function darkenColor(color: string | undefined) {
  const darkenedColor = Color(color).darken(0.175);
  return darkenedColor;
}

import {
  CustoplayerItem,
  FullscreenButtonItem,
  PlayButtonItem,
  ProgressBarItem,
  SettingsButtonItem,
  TimeItem,
  VolumeItem,
} from '@root/lib/types';
import { SetStateAction, SyntheticEvent } from 'react';
import { isVolumeDraggingType, possibleQualities } from '@root/lib/atoms';
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

export function handleKeyPress(
  e: React.KeyboardEvent<HTMLDivElement>,
  video: HTMLVideoElement | null,
  focusedItem: 'volumeBar1' | 'volumeBar2' | 'progressBar' | null,
) {
  if (e.key === ' ' || e.key === 'k') {
    e.preventDefault();
    if (video !== null) handlePlayState(video);
  } else if (
    e.key === 'ArrowLeft' ||
    e.key === 'ArrowRight' ||
    e.key === 'ArrowUp' ||
    e.key === 'ArrowDown'
  ) {
    e.preventDefault();
    if (video !== null && focusedItem !== null) {
      if (focusedItem.startsWith('volumeBar')) {
        let newVolume = video.volume;
        // Horizontal Volume Bar
        if (focusedItem === 'volumeBar1') {
          if (e.key === 'ArrowLeft') {
            newVolume -= 0.05;
          } else if (e.key === 'ArrowRight') {
            newVolume += 0.05;
          }
        }
        // Vertical Volume Bar
        else if (focusedItem === 'volumeBar2') {
          if (e.key === 'ArrowDown') {
            newVolume -= 0.05;
          } else if (e.key === 'ArrowUp') {
            newVolume += 0.05;
          }
        }

        video.volume = clamp(newVolume, 0, 1);
      } else {
        let newTime = video.currentTime;
        if (e.key === 'ArrowLeft') {
          newTime -= 5;
        } else if (e.key === 'ArrowRight') {
          newTime += 5;
        }
        video.currentTime = clamp(newTime, 0, video.duration);
      }
    }
  }
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
  previewTooltipWidth: number,
  setProgress: (update: SetStateAction<number>) => void,
  setIsProgressDragging: (update: SetStateAction<boolean>) => void,
  setPreviewTooltipHoveredTime: (update: SetStateAction<number>) => void,
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
      previewTooltipWidth,
      setPreviewTooltipHoveredTime,
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
      setPreviewTooltipHoveredTime(currentTime);
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
  previewTooltipWidth: number,
  setPreviewTooltipHoveredTime: (update: SetStateAction<number>) => void,
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
    setPreviewTooltipHoveredTime(currentTime);
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

/*
  A function that gets the current quality of the
  video element by looping through all the video <source>
  tags and checking if the id attribute contains, 1440, 1080, 720, 480, 360, 240, 144 etc...
*/
export function getCurrentQuality(
  e: SyntheticEvent<HTMLVideoElement, Event>,
  children: React.ReactNode,
): number {
  const videoSrc = (e.target as HTMLVideoElement).currentSrc;

  if (children instanceof Object) {
    if ('props' in children && children.type === 'source') {
      const quality = parseInt(children['props'].id.split('-')[1]);
      if (possibleQualities.has(quality)) {
        const qualitySrc = children['props'].src;
        const hasSameSrc = qualitySrc === videoSrc;
        if (hasSameSrc) return quality;
      }
    } else if (Array.isArray(children)) {
      const qualityInfo = children
        .filter((child) => child.type === 'source')
        .map((elem) => elem.props)
        .filter((val) => val !== undefined);

      // Gets the matching quality based off of src values
      const qualityData = qualityInfo
        .map((obj) => {
          const quality = parseInt(obj.id.split('-')[1]);

          if (possibleQualities.has(quality)) {
            const hasSameSrc = obj.src === videoSrc;
            if (hasSameSrc) return quality;
          }
        })
        .filter((val) => val !== undefined) as number[];

      if (qualityData.length === 1) return qualityData[0];
    }
    // fallback quality value when no quality is found
    return 1080;
  }
  return 1080;
}

export function resolveCues(tracks: TextTrack) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(tracks.cues);
    }, 500);
  });
}

// Configures the cues for the selected subtitle text trac
export function selectSubtitleTrack(
  setSubtitles: (update: SetStateAction<TextTrack[] | null>) => void,
  selectedIndex: number,
) {
  setSubtitles((prev) => {
    if (prev === null) return null;
    prev.forEach((track) => {
      track.mode = 'hidden';
    });
    prev[selectedIndex].mode = 'showing';
    return prev;
  });
}

export function getHoveredThumbnail(
  previewTooltipHoveredTime: number,
  previewTooltipThumbnails: TextTrackCueList | null,
) {
  if (previewTooltipThumbnails === null) return null;
  const previewTooltipThumbnailsArray = Array.from(
    previewTooltipThumbnails,
  ) as VTTCue[];
  const hoveredThumbnail = previewTooltipThumbnailsArray.find(
    (cue) =>
      previewTooltipHoveredTime > cue.startTime &&
      previewTooltipHoveredTime < cue.endTime,
  );
  return hoveredThumbnail ?? null;
}

/** Gets a readable color from a background color */
export function getReadableTextColor(color: string): string {
  let r, g, b;

  // If the color is already an RGB color, extract the red, green, and blue components
  const isRgb = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i.exec(color);
  if (isRgb) {
    r = parseInt(isRgb[1], 10);
    g = parseInt(isRgb[2], 10);
    b = parseInt(isRgb[3], 10);
  } else {
    // If the color is a named color, get its RGB value
    const namedColor = document.createElement('div');
    namedColor.style.color = color;
    document.body.appendChild(namedColor);
    const computedColor = getComputedStyle(namedColor).color;
    document.body.removeChild(namedColor);
    const match = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i.exec(
      computedColor,
    );
    if (match) {
      r = parseInt(match[1], 10);
      g = parseInt(match[2], 10);
      b = parseInt(match[3], 10);
    } else {
      // If the color is a hex color, convert it to RGB
      r = parseInt(color.slice(1, 3), 16);
      g = parseInt(color.slice(3, 5), 16);
      b = parseInt(color.slice(5, 7), 16);
    }
  }

  // Calculate the luminance of the color and return a readable text color
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

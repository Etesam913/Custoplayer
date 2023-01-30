import { CustoplayerItem } from '@/types';
import { getEventListeners } from 'events';
import PlayButtons from './components/PlayButtons';
import ProgressBars from './components/ProgressBars';

export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export const throttle = (fn: Function, ms = 300) => {
  let isThrottled = false,
    savedArgs: any,
    savedThis: any;

  function wrapper(this: any) {
    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    fn.apply(this, arguments);

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

export function renderItemFromData(curItem: CustoplayerItem) {
  if (curItem?.id.startsWith('playButton')) {
    return <PlayButtons item={curItem} />;
  } else if (curItem?.id.startsWith('progressBar')) {
    return <ProgressBars item={curItem} />;
  }
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
  }
}

export function getSvgPath(path: string, strokeWidth: string = '1.8') {
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

function getMousePos(e: MouseEvent, callback: Function) {
  const bar = e.target as HTMLElement;
  // TODO: Fix bug where drag goes into dev tools
  const barRect = bar.getBoundingClientRect();
  const mousePos = e.clientX - barRect.left;
  callback(mousePos);
}

export function barMouseEvent(
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  callback: Function,
  setIsHovered: Dispatch<SetStateAction<boolean>>,
) {
  e.stopPropagation();
  setIsHovered(true);
  function mouseMove(e: MouseEvent) {
    const throttledGetMousePos = throttle(() => getMousePos(e, callback), 1000);
    throttledGetMousePos();
  }

  function cleanUpDocumentEvents() {
    setIsHovered(false);
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', cleanUpDocumentEvents);
  }

  document.addEventListener('mousemove', mouseMove);
  document.addEventListener('mouseup', cleanUpDocumentEvents);
}

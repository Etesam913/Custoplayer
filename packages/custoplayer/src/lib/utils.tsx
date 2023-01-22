import { CustoplayerItem } from '@/types';
import PlayButtons from './components/PlayButtons';

export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export function renderItemFromData(curItem: CustoplayerItem) {
  if (curItem?.id.startsWith('playButton')) {
    return <PlayButtons item={curItem} />;
  }
}

export function handlePlayState(video: HTMLVideoElement | null) {
  if (video === null) return;
  const isPlaying = !video.paused && !video.ended && video.currentTime > 0;
  if (isPlaying) video.pause();
  else if (video.paused) video.play();
  else if (video.ended) video.play();
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

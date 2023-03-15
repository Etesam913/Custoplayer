import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import {
  myScope,
  videoDimensionsObserverAtom,
  videoDimensionsAtom,
  videoElemAtom,
  PlayState,
} from '@root/lib/atoms';

export function useDimensions() {
  const [videoDimensionsObserver, setVideoDimensionsObserver] = useAtom(
    videoDimensionsObserverAtom,
    myScope,
  );
  const setVideoDimensions = useSetAtom(videoDimensionsAtom, myScope);
  const videoElem = useAtomValue(videoElemAtom, myScope);

  useEffect(() => {
    if (videoElem !== null) {
      setVideoDimensionsObserver(
        new ResizeObserver((entries: ResizeObserverEntry[]) => {
          const video = entries[0];
          if (video && video.contentRect) {
            setVideoDimensions({
              height: parseFloat(video.contentRect.height.toFixed(2)),
              width: parseFloat(video.contentRect.width.toFixed(2)),
            });
          }
        }),
      );
    }
  }, [videoElem, setVideoDimensions, setVideoDimensionsObserver]);

  useEffect(() => {
    if (videoDimensionsObserver !== null && videoElem !== null) {
      videoDimensionsObserver.observe(videoElem);
    }
  }, [videoDimensionsObserver, videoElem]);
}

export function useProgressDragging(
  tempVideoPauseState: number,
  videoElem: HTMLVideoElement | null,
  isProgressDragging: boolean,
  setTempVideoPauseState: (value: React.SetStateAction<number>) => void,
  playState: PlayState,
) {
  function handleProgressMouseUp() {
    if (
      tempVideoPauseState === PlayState.paused ||
      tempVideoPauseState === PlayState.ended
    )
      videoElem?.pause();
    else if (tempVideoPauseState === PlayState.playing) videoElem?.play();
  }
  useEffect(() => {
    if (isProgressDragging) {
      setTempVideoPauseState(playState);
      videoElem?.pause();
    } else {
      handleProgressMouseUp();
    }
  }, [isProgressDragging]);
}

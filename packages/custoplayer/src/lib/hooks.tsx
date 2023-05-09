import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { SetStateAction, useEffect, ReactNode } from 'react';
import {
  myScope,
  videoDimensionsObserverAtom,
  videoDimensionsAtom,
  videoElemAtom,
  PlayState,
} from '@root/lib/atoms';
import screenfull from 'screenfull';
import { videoQualitiesAtomType } from './types';

// Gets dimensions of the video player
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

// Handles state when a volume or progress bar is being dragged
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
    ) {
      videoElem?.pause();
    } else if (tempVideoPauseState === PlayState.playing) {
      videoElem?.play();
    }
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

export function useFullscreenEvent(
  setIsFullscreen: (update: SetStateAction<boolean>) => void,
) {
  useEffect(() => {
    function updateFullscreen() {
      setIsFullscreen(screenfull.isFullscreen);
    }
    if (screenfull.isEnabled) {
      screenfull.on('change', updateFullscreen);
    }
    return () => {
      if (screenfull.isEnabled) {
        screenfull.off('change', updateFullscreen);
      }
    };
  }, [setIsFullscreen]);
}

/** Initializes videoQualities whenever video children changes */
export function useQualities(
  children: ReactNode,
  setVideoQualities: (update: SetStateAction<videoQualitiesAtomType>) => void,
) {
  useEffect(() => {
    if (children instanceof Object) {
      const videoQualities: videoQualitiesAtomType = {
        2160: null,
        1440: null,
        1080: null,
        720: null,
        480: null,
        360: null,
        240: null,
        144: null,
      };
      if ('props' in children) {
        const quality = parseInt(children['props'].id.split('-')[1]);
        if (quality in videoQualities) {
          videoQualities[quality] = children['props'].src;
        }
      } else if (Array.isArray(children)) {
        const qualityInfo = children
          .map((elem) => elem.props)
          .filter((val) => val !== undefined);

        qualityInfo.forEach((obj) => {
          const quality = parseInt(obj.id.split('-')[1]);
          if (quality in videoQualities) {
            videoQualities[quality] = obj.src;
          }
        });
        setVideoQualities(videoQualities);
      }
    }
  }, [children]);
}

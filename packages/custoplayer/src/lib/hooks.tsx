import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  SetStateAction,
  useEffect,
  ReactNode,
  ComponentPropsWithoutRef,
} from 'react';
import {
  myScope,
  videoDimensionsObserverAtom,
  videoDimensionsAtom,
  videoElemAtom,
  PlayState,
  playingPromise,
} from '@root/lib/atoms';
import screenfull from 'screenfull';
import {
  CustoplayerItem,
  CustoplayerValues,
  videoQualitiesAtomType,
} from './types';

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
      playingPromise.promise &&
        playingPromise.promise.then(() => undefined).catch(() => undefined);
      videoElem?.pause();
    } else if (tempVideoPauseState === PlayState.playing) {
      playingPromise.promise = videoElem?.play() ?? null;
    }
  }
  useEffect(() => {
    if (isProgressDragging) {
      playingPromise.promise &&
        playingPromise.promise.then(() => undefined).catch(() => undefined);
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

// Loads the thumbnail track and sets a state
export function usePreviewThumbnails(
  video: HTMLVideoElement | null,
  setPreviewTooltipThumbnails: (
    update: SetStateAction<TextTrackCueList | null>,
  ) => void,
) {
  useEffect(() => {
    if (video !== null) {
      const tracks = video.textTracks;
      let thumbnailTrack: TextTrack | null = null;
      for (let i = 0; i < tracks.length; i++) {
        if (tracks[i].id === 'custoplayer-thumbnails') {
          thumbnailTrack = tracks[i];
        }
      }

      if (thumbnailTrack !== null) {
        thumbnailTrack.mode = 'hidden';
        const cues = thumbnailTrack.cues;
        if (cues) setPreviewTooltipThumbnails(thumbnailTrack.cues);
      }
    }
  }, [video]);
}

export function useSubtitles(
  children: ReactNode,
  video: HTMLVideoElement | null,
  setSubtitles: (update: SetStateAction<Array<TextTrack> | null>) => void,
  setCurrentSubtitle: (update: SetStateAction<VTTCue | null>) => void,
  setCurrentTextTrack: (update: SetStateAction<TextTrack | null>) => void,
) {
  useEffect(() => {
    if (video !== null) {
      const tracks = video.textTracks;
      if (children instanceof Object) {
        if ('props' in children && children.type === 'track') {
        } else if (Array.isArray(children)) {
          const trackChildren = children.filter(
            (child) => child.type === 'track',
          );
          const defaultIndex = trackChildren.findIndex(
            (v) => v.props.default === true,
          );
          if (defaultIndex !== -1) {
            tracks[defaultIndex].mode = 'showing';
          }
        }
      }

      // When a new text track is selected, update the current text track
      tracks.onchange = (event) => {
        const textTracks = Array.from(event.target as TextTrackList);
        setCurrentTextTrack(
          textTracks.find((v) => v.mode === 'showing') ?? null,
        );
      };

      const trackList: TextTrack[] = [];
      for (let i = 0; i < tracks.length; i++) {
        // custoplayer-thumbnails are not subtitles
        if (tracks[i].id !== 'custoplayer-thumbnails') {
          trackList.push(tracks[i]);
        }
      }

      trackList.forEach((track) => {
        track.oncuechange = (event) => {
          const eventTarget = event.target as TextTrack;
          if (eventTarget.mode === 'showing') {
            const cue = eventTarget.activeCues
              ? (eventTarget.activeCues[0] as VTTCue)
              : null;
            setCurrentSubtitle(cue);
          }
        };
      });

      setSubtitles(trackList);
    }
  }, [video]);
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
      if ('props' in children && children.type === 'source') {
        const quality = parseInt(children['props'].id.split('-')[1]);
        if (quality in videoQualities) {
          videoQualities[quality] = children['props'].src;
        }
      } else if (Array.isArray(children)) {
        const qualityInfo = children
          .filter((child) => child.type === 'source')
          .map((elem) => elem.props)
          .filter((val) => val !== undefined);

        qualityInfo.forEach((obj) => {
          const quality = parseInt(obj.id.split('-')[1]);
          if (quality in videoQualities) {
            videoQualities[quality] = obj.src;
          }
        });
      }
      setVideoQualities(videoQualities);
    }
  }, [children]);
}

/** Runs the handler method whenever a click is registered
 * outside of the ref element */
export function useOnClickOutside(
  ref: React.RefObject<any>,
  handler: (e: MouseEvent) => void,
) {
  useEffect(
    () => {
      const listener = (event: MouseEvent) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener('click', listener);
      // document.addEventListener("touchend", listener);

      return () => {
        document.removeEventListener('click', listener);
        // document.removeEventListener("touchend", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler],
  );
}

export function useMouseMovementTimer(
  element: HTMLElement | null,
  isFullscreen: boolean,
  movementCallback: () => void,
  noMovementCallback: () => void,
) {
  let timer: ReturnType<typeof setTimeout>;

  function resetMouseMovement() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      noMovementCallback();
    }, 2500);
  }

  const handleMouseMove = () => {
    movementCallback();
    resetMouseMovement();
  };

  useEffect(() => {
    if (isFullscreen && element) {
      element.addEventListener('mousemove', handleMouseMove);

      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        clearTimeout(timer);
      };
    }
  }, [element, isFullscreen]);
}

/**
If fullscreen mode is entered via context menu
The fullscreen mode is applied to the video container
instead. This is done so that the controls bar can be
shown in fullscreen mode.
*/
export function usePreventFullscreen(
  video: HTMLVideoElement | null,
  videoContainer: HTMLDivElement | null,
) {
  useEffect(() => {
    function handleFullscreenChange(event: Event) {
      const videoElement = event.target as HTMLVideoElement;
      const isFullscreen = document.fullscreenElement === videoElement;

      if (isFullscreen && videoContainer) {
        document.exitFullscreen().then(() => {
          videoContainer.requestFullscreen();
        });
      }
    }

    if (video) {
      video.addEventListener('fullscreenchange', handleFullscreenChange);
    }

    return () => {
      if (video) {
        video.removeEventListener('fullscreenchange', handleFullscreenChange);
      }
    };
  }, [video]);
}

/** Updates videoValues and videoItems whenever they change */
export const useListenForChanges = (
  setValues: (update: SetStateAction<CustoplayerValues>) => void,
  setItems: (update: SetStateAction<(CustoplayerItem | undefined)[]>) => void,
  setVideoAttributes: (
    update: SetStateAction<
      Omit<
        React.DetailedHTMLProps<
          React.VideoHTMLAttributes<HTMLVideoElement>,
          HTMLVideoElement
        >,
        'ref'
      >
    >,
  ) => void,
  rest: ComponentPropsWithoutRef<'video'>,
  values: CustoplayerValues,
) => {
  useEffect(() => {
    // Setting default controlsBar color
    if (values?.controlsBar && !values?.controlsBar?.barColor)
      values.controlsBar.barColor = 'rgba(28, 28, 28, 0.7)';
    setValues(values);
    setItems([
      values.item1,
      values.item2,
      values.item3,
      values.item4,
      values.item5,
      values.item6,
      values.item7,
    ]);
  }, [values]);

  useEffect(() => {
    setVideoAttributes(rest);
  }, [rest]);
};

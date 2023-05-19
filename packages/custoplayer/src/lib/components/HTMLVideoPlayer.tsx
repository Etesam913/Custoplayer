import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import styled from 'styled-components';
import {
  controlsBarTimeoutAtom,
  currentQualityAtom,
  currentSubtitleAtom,
  currentTextTrackAtom,
  currentTimeAtom,
  draggableSymbol,
  durationAtom,
  isMutedAtom,
  isProgressDraggingAtom,
  isSeekingAtom,
  isSeekingTimeoutAtom,
  isVolumeDraggingAtom,
  isVolumeDraggingType,
  myScope,
  playbackSpeedAtom,
  PlayState,
  playStateAtom,
  previewTooltipThumbnailsAtom,
  progressAtom,
  progressBufferPercentAtom,
  showControlsBarAtom,
  subtitlesAtom,
  valuesAtom,
  videoAttributesAtom,
  videoElemAtom,
  videoQualitiesAtom,
  volumeAtom,
} from '@root/lib/atoms';

import { SyntheticEvent, useCallback } from 'react';
import { getCurrentQuality, handlePlayState, throttle } from '../utils';
import { usePreviewThumbnails, useQualities, useSubtitles } from '../hooks';

function HTMLVideoPlayer() {
  const [videoElem, setVideoElem] = useAtom(videoElemAtom, myScope);
  const [values, setValues] = useAtom(valuesAtom, myScope);
  const setPlayState = useSetAtom(playStateAtom, myScope);
  const playState = useAtomValue(playStateAtom, myScope);
  const setPlaybackSpeed = useSetAtom(playbackSpeedAtom, myScope);
  const [controlsBarTimeout, setControlsBarTimeout] = useAtom(
    controlsBarTimeoutAtom,
    myScope,
  );
  const [showControlsBar, setShowControlsBar] = useAtom(
    showControlsBarAtom,
    myScope,
  );
  const setProgress = useSetAtom(progressAtom, myScope);
  const setVolume = useSetAtom(volumeAtom, myScope);
  const setDuration = useSetAtom(durationAtom, myScope);
  const setIsSeeking = useSetAtom(isSeekingAtom, myScope);
  const setCurrentTime = useSetAtom(currentTimeAtom, myScope);
  const setIsMuted = useSetAtom(isMutedAtom, myScope);
  const setCurrentQuality = useSetAtom(currentQualityAtom, myScope);

  const [isSeekingTimeout, setIsSeekingTimeout] = useAtom(
    isSeekingTimeoutAtom,
    myScope,
  );
  const setProgressBufferPercent = useSetAtom(
    progressBufferPercentAtom,
    myScope,
  );
  const setSubtitles = useSetAtom(subtitlesAtom, myScope);
  const setCurrentSubtitle = useSetAtom(currentSubtitleAtom, myScope);
  const setCurrentTextTrack = useSetAtom(currentTextTrackAtom, myScope);
  const setVideoQualities = useSetAtom(videoQualitiesAtom, myScope);
  const setPreviewTooltipThumbnails = useSetAtom(
    previewTooltipThumbnailsAtom,
    myScope,
  );
  const isProgressDragging = useAtomValue(isProgressDraggingAtom, myScope);
  const isVolumeDragging = useAtomValue(isVolumeDraggingAtom, myScope);
  const videoAttributes = useAtomValue(videoAttributesAtom, myScope);
  const {
    playsInline,
    onClick,
    onPause,
    onPlay,
    onEnded,
    onTimeUpdate,
    onVolumeChange,
    onLoadedData,
    onLoadStart,
    onSeeking,
    onSeeked,
    preload,
    tabIndex,
    onDurationChange,
    onProgress,
    onRateChange,
    children,
    ...otherAttributes
  } = videoAttributes;

  useQualities(children, setVideoQualities);
  useSubtitles(
    children,
    videoElem,
    setSubtitles,
    setCurrentSubtitle,
    setCurrentTextTrack,
  );
  usePreviewThumbnails(videoElem, setPreviewTooltipThumbnails);

  const handlePlay = () => {
    setPlayState(PlayState.playing);
  };
  const handlePause = () => {
    setPlayState(PlayState.paused);
  };

  const handleEnded = () => {
    setPlayState(PlayState.ended);
  };

  const handleMouseMove = useCallback(
    throttle(() => {
      controlsBarTimeout !== null && clearInterval(controlsBarTimeout);
      if (playState === PlayState.playing) {
        setShowControlsBar;
        setControlsBarTimeout(() =>
          setTimeout(() => setShowControlsBar(false), 3000),
        );
      }
    }, 200),
    [controlsBarTimeout, playState],
  );

  function handleProgress(e: SyntheticEvent<HTMLVideoElement, Event>) {
    /*
      Buffers do not need to be calculated when the
      controls bar cannot show them
    */

    if (!showControlsBar) return;
    const video = e.target as HTMLVideoElement;
    // Video Ready States: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState
    if (video.readyState === 4) {
      const numOfBuffers = video.buffered.length;
      const bufferedProgress = video.buffered.end(numOfBuffers - 1);
      const normalizedBufferedProgress =
        (bufferedProgress / video.duration) * 100;
      setProgressBufferPercent(normalizedBufferedProgress);
    }
  }

  function handleTimeUpdate(e: SyntheticEvent<HTMLVideoElement, Event>) {
    const video = e.target as HTMLVideoElement;

    setProgress(video.currentTime / video.duration);
    setCurrentTime(video.currentTime);
  }

  function handleOnSeeking() {
    // if (isSeekingTimeout !== null) {
    //   clearTimeout(isSeekingTimeout);
    //   setIsSeekingTimeout(null);
    // }
    // if (isSeekingTimeout !== null) {
    //   clearTimeout(isSeekingTimeout);
    // }
    // setIsSeekingTimeout(
    //   setTimeout(() => {
    //     console.log('true');
    //     setIsSeeking(true);
    //   }, 2000),
    // );
    setIsSeeking(true);
  }

  function handleOnSeeked() {
    // console.log('end');
    // if (isSeekingTimeout !== null) {
    //   window.clearTimeout(isSeekingTimeout);
    // }
    // setIsSeekingTimeout(null);
    // if (isSeekingTimeout !== null) {
    //   clearTimeout(isSeekingTimeout);
    // }
    // setIsSeekingTimeout(null);
    setIsSeeking(false);
  }

  return (
    <HTMLPlayer
      {...otherAttributes}
      className={draggableSymbol.toString()}
      playsInline={playsInline ?? true}
      onClick={(e: React.MouseEvent<HTMLVideoElement>) => {
        handlePlayState(videoElem);
        onClick && onClick(e);
      }}
      onPause={(e) => {
        handlePause();
        onPause && onPause(e);
      }}
      onPlay={(e) => {
        handlePlay();
        console.log((e.target as HTMLVideoElement).textTracks);
        onPlay && onPlay(e);
      }}
      onEnded={(e) => {
        handleEnded();
        onEnded && onEnded(e);
      }}
      onLoadedData={(e: SyntheticEvent<HTMLVideoElement, Event>) => {
        setVideoElem(e.target as HTMLVideoElement);
        setCurrentQuality(getCurrentQuality(e, children));
        onLoadedData && onLoadedData(e);
      }}
      onLoadStart={(e: SyntheticEvent<HTMLVideoElement, Event>) => {
        setVideoElem(e.target as HTMLVideoElement);
        setValues({ ...values });
        onLoadStart && onLoadStart(e);
      }}
      onVolumeChange={(e) => {
        setVolume((e.target as HTMLVideoElement).volume);
        setIsMuted((e.target as HTMLVideoElement).muted);
        onVolumeChange && onVolumeChange(e);
      }}
      onSeeking={(e) => {
        handleOnSeeking();
        onSeeking && onSeeking(e);
      }}
      onSeeked={(e) => {
        handleOnSeeked();
        handleProgress(e);
        onSeeked && onSeeked(e);
      }}
      onTimeUpdate={(e) => {
        handleTimeUpdate(e);
        onTimeUpdate && onTimeUpdate(e);
      }}
      onProgress={(e) => {
        handleProgress(e);
        onProgress && onProgress(e);
      }}
      onDurationChange={(e) => {
        setDuration((e.target as HTMLVideoElement).duration);
        onDurationChange && onDurationChange(e);
      }}
      onRateChange={(e) => {
        setPlaybackSpeed((e.target as HTMLVideoElement).playbackRate);
        onRateChange && onRateChange(e);
      }}
      preload={preload ?? 'metadata'}
      tabIndex={tabIndex ?? -1}
      data-cy='HTMLVideoPlayer'
      isDragging={isProgressDragging || isVolumeDragging}
    >
      {children}
    </HTMLPlayer>
  );
}

const HTMLPlayer = styled.video<{
  isDragging: boolean | isVolumeDraggingType;
}>`
  width: 100%;
  height: 100%;
  background-color: black;
  ::cue {
    visibility: hidden;
    background-color: transparent;
    display: none;
    opacity: 0;
    text-shadow: 0;
  }
  cursor: ${(props) =>
    props.isDragging
      ? props.isDragging === 'vertical'
        ? 'row-resize'
        : 'col-resize'
      : 'pointer'};
`;

export default HTMLVideoPlayer;

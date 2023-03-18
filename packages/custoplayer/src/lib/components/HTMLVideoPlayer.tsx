import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import styled from 'styled-components';
import {
  controlsBarTimeoutAtom,
  currentTimeAtom,
  draggableSymbol,
  durationAtom,
  isProgressDraggingAtom,
  isSeekingAtom,
  isSeekingTimeoutAtom,
  isVolumeDraggingAtom,
  isVolumeDraggingType,
  myScope,
  PlayState,
  playStateAtom,
  progressAtom,
  showControlsBarAtom,
  valuesAtom,
  videoAttributesAtom,
  videoElemAtom,
  volumeAtom,
} from '@root/lib/atoms';
import { SyntheticEvent, useCallback } from 'react';
import { handlePlayState, throttle } from '../utils';

function HTMLVideoPlayer() {
  const [videoElem, setVideoElem] = useAtom(videoElemAtom, myScope);
  const [values, setValues] = useAtom(valuesAtom, myScope);
  const setPlayState = useSetAtom(playStateAtom, myScope);
  const playState = useAtomValue(playStateAtom, myScope);
  const [controlsBarTimeout, setControlsBarTimeout] = useAtom(
    controlsBarTimeoutAtom,
    myScope,
  );
  const setShowControlsBar = useSetAtom(showControlsBarAtom, myScope);
  const setProgress = useSetAtom(progressAtom, myScope);
  const setVolume = useSetAtom(volumeAtom, myScope);
  const setDuration = useSetAtom(durationAtom, myScope);
  const setIsSeeking = useSetAtom(isSeekingAtom, myScope);
  const setCurrentTime = useSetAtom(currentTimeAtom, myScope);
  const [isSeekingTimeout, setIsSeekingTimeout] = useAtom(
    isSeekingTimeoutAtom,
    myScope,
  );
  const isProgressDragging = useAtomValue(isProgressDraggingAtom, myScope);
  const isVolumeDragging = useAtomValue(isVolumeDraggingAtom, myScope);
  const videoAttributes = useAtomValue(videoAttributesAtom, myScope);
  const {
    onClick,
    playsInline,
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
    ...otherAttributes
  } = videoAttributes;

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
        setShowControlsBar(true);
        setControlsBarTimeout(() =>
          setTimeout(() => setShowControlsBar(false), 3000),
        );
      }
    }, 200),
    [controlsBarTimeout, playState],
  );

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
      onClick={(e) => {
        handlePlayState(videoElem);
        onClick && onClick(e);
      }}
      playsInline={playsInline !== null ? playsInline : true}
      // onMouseMove={handleMouseMove}
      onPause={(e) => {
        handlePause();
        onPause && onPause(e);
      }}
      onPlay={(e) => {
        handlePlay();
        onPlay && onPlay(e);
      }}
      onEnded={(e) => {
        handleEnded();
        onEnded && onEnded(e);
      }}
      onLoadedData={(e: SyntheticEvent<HTMLVideoElement, Event>) => {
        setVideoElem(e.target as HTMLVideoElement);
        onLoadedData && onLoadedData(e);
      }}
      onLoadStart={(e: SyntheticEvent<HTMLVideoElement, Event>) => {
        setVideoElem(e.target as HTMLVideoElement);
        setValues({ ...values });
        onLoadStart && onLoadStart(e);
      }}
      onVolumeChange={(e) => {
        setVolume((e.target as HTMLVideoElement).volume);
        onVolumeChange && onVolumeChange(e);
      }}
      onSeeking={(e) => {
        handleOnSeeking();
        onSeeking && onSeeking(e);
      }}
      onSeeked={(e) => {
        handleOnSeeked();
        onSeeked && e;
      }}
      onTimeUpdate={(e) => {
        handleTimeUpdate(e);
        onTimeUpdate && onTimeUpdate(e);
      }}
      onDurationChange={(e) => {
        setDuration((e.target as HTMLVideoElement).duration);
        onDurationChange && onDurationChange(e);
      }}
      preload={preload !== null ? preload : 'metadata'}
      tabIndex={tabIndex !== null ? tabIndex : -1}
      data-cy='HTMLVideoPlayer'
      isDragging={isProgressDragging || isVolumeDragging}
    />
  );
}

const HTMLPlayer = styled.video<{ isDragging: boolean | isVolumeDraggingType }>`
  width: 100%;
  height: 100%;
  background-color: black;
  cursor: ${(props) =>
    props.isDragging
      ? props.isDragging === 'vertical'
        ? 'row-resize'
        : 'col-resize'
      : 'pointer'};
`;

export default HTMLVideoPlayer;

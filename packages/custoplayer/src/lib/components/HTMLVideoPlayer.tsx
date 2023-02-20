import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import styled from 'styled-components';
import {
  controlsBarTimeoutAtom,
  draggableSymbol,
  isDraggingAtom,
  isSeekingAtom,
  isSeekingTimeoutAtom,
  myScope,
  PlayState,
  playStateAtom,
  progressAtom,
  showControlsBarAtom,
  valuesAtom,
  videoElemAtom,
} from '@/lib/atoms';
import { SyntheticEvent, useCallback } from 'react';
import { debounce, handlePlayState, throttle } from '../utils';

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
  const setIsSeeking = useSetAtom(isSeekingAtom, myScope);
  const [isSeekingTimeout, setIsSeekingTimeout] = useAtom(
    isSeekingTimeoutAtom,
    myScope,
  );
  const isDragging = useAtomValue(isDraggingAtom, myScope);

  const handlePause = useCallback(() => {
    setPlayState(PlayState.paused);
    controlsBarTimeout !== null && clearInterval(controlsBarTimeout);
    setControlsBarTimeout(null);
    setShowControlsBar(true);
  }, [controlsBarTimeout]);

  const handlePlay = useCallback(() => {
    setPlayState(PlayState.playing);
    setControlsBarTimeout(() =>
      setTimeout(() => setShowControlsBar(false), 3000),
    );
  }, []);

  const handleEnded = useCallback(() => {
    setPlayState(PlayState.ended);
    controlsBarTimeout !== null && clearInterval(controlsBarTimeout);
    setControlsBarTimeout(null);
    setShowControlsBar(true);
  }, [controlsBarTimeout]);

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
    console.log('seeking');
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
      className={draggableSymbol.toString()}
      onClick={() => handlePlayState(videoElem)}
      src={values.src}
      playsInline
      onMouseMove={handleMouseMove}
      onPause={handlePause}
      onPlay={handlePlay}
      onEnded={handleEnded}
      onLoadedData={(e: SyntheticEvent<HTMLVideoElement, Event>) =>
        setVideoElem(e.target as HTMLVideoElement)
      }
      onLoadStart={(e: SyntheticEvent<HTMLVideoElement, Event>) => {
        setVideoElem(e.target as HTMLVideoElement);
        setValues({ ...values, src: (e.target as HTMLVideoElement).src });
      }}
      onSeeking={handleOnSeeking}
      onSeeked={handleOnSeeked}
      onTimeUpdate={handleTimeUpdate}
      preload='metadata'
      tabIndex={-1}
      isDragging={isDragging}
    />
  );
}

const HTMLPlayer = styled.video<{ isDragging: boolean }>`
  width: 100%;
  height: 100%;
  background-color: black;
  cursor: ${(props) => (props.isDragging ? 'col-resize' : 'pointer')};
`;

export default HTMLVideoPlayer;

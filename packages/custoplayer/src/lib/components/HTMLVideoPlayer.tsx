import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import styled from 'styled-components';
import {
  controlsBarTimeoutAtom,
  draggableSymbol,
  isProgressDraggingAtom,
  isSeekingAtom,
  isSeekingTimeoutAtom,
  isVolumeDraggingAtom,
  myScope,
  PlayState,
  playStateAtom,
  progressAtom,
  showControlsBarAtom,
  valuesAtom,
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
  const setIsSeeking = useSetAtom(isSeekingAtom, myScope);
  const [isSeekingTimeout, setIsSeekingTimeout] = useAtom(
    isSeekingTimeoutAtom,
    myScope,
  );
  const isProgressDragging = useAtomValue(isProgressDraggingAtom, myScope);
  const isVolumeDragging = useAtomValue(isVolumeDraggingAtom, myScope);

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
      className={draggableSymbol.toString()}
      onClick={() => handlePlayState(videoElem)}
      src={values.src}
      playsInline
      // onMouseMove={handleMouseMove}
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
      onVolumeChange={(e) => setVolume((e.target as HTMLVideoElement).volume)}
      onSeeking={handleOnSeeking}
      onSeeked={handleOnSeeked}
      onTimeUpdate={handleTimeUpdate}
      preload='metadata'
      tabIndex={-1}
      data-testid='HTMLVideoPlayer'
      isDragging={isProgressDragging || isVolumeDragging}
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

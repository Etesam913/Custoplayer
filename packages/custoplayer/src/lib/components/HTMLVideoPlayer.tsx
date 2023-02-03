import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import styled from 'styled-components';
import {
  controlsBarTimeoutAtom,
  draggableSymbol,
  myScope,
  PlayState,
  playStateAtom,
  progressAtom,
  showControlsBarAtom,
  valuesAtom,
  videoElemAtom,
} from '@/lib/atoms';
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
  const [controlsBar, setShowControlsBar] = useAtom(
    showControlsBarAtom,
    myScope,
  );
  const [progress, setProgress] = useAtom(progressAtom, myScope);

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
    [controlsBarTimeout, playState, setShowControlsBar, setControlsBarTimeout],
  );

  function handleTimeUpdate(e: SyntheticEvent<HTMLVideoElement, Event>) {
    const video = e.target as HTMLVideoElement;
    setProgress(
      parseFloat(((video.currentTime / video.duration) * 100).toFixed(1)),
    );
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
      onTimeUpdate={handleTimeUpdate}
      preload='metadata'
      tabIndex={-1}
    />
  );
}

const HTMLPlayer = styled.video`
  width: 100%;
  height: 100%;
  background-color: black;
  cursor: pointer;
`;

export default HTMLVideoPlayer;

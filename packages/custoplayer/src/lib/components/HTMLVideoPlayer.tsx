import { useAtom } from 'jotai';
import styled from 'styled-components';
import {
  controlsBarTimeoutAtom,
  getPlayStateAtom,
  myScope,
  PlayState,
  setPlayStateAtom,
  showControlsBarAtom,
  valuesAtom,
  videoElemAtom,
} from '@/lib/atoms';
import { SyntheticEvent, useCallback, useMemo } from 'react';
import { handlePlayState, throttle } from '../utils';

function HTMLVideoPlayer() {
  const [videoElem, setVideoElem] = useAtom(videoElemAtom, myScope);
  const [values, setValues] = useAtom(valuesAtom, myScope);
  const [, setPlayState] = useAtom(setPlayStateAtom, myScope);
  const [playState] = useAtom(getPlayStateAtom, myScope);
  const [controlsBarTimeout, setControlsBarTimeout] = useAtom(
    controlsBarTimeoutAtom,
    myScope,
  );
  const [controlsBar, setShowControlsBar] = useAtom(
    showControlsBarAtom,
    myScope,
  );

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

  return (
    <HTMLPlayer
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

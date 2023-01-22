import { useAtom } from 'jotai';
import styled from 'styled-components';
import {
  myScope,
  PlayState,
  setPlayStateAtom,
  valuesAtom,
  videoElemAtom,
} from '@/lib/atoms';
import { SyntheticEvent } from 'react';
import { handlePlayState } from '../utils';

function HTMLVideoPlayer() {
  const [videoElem, setVideoElem] = useAtom(videoElemAtom, myScope);
  const [values, setValues] = useAtom(valuesAtom, myScope);
  const [, setPlayState] = useAtom(setPlayStateAtom, myScope);

  return (
    <HTMLPlayer
      onClick={() => handlePlayState(videoElem)}
      src={values.src}
      playsInline
      onPause={() => setPlayState(PlayState.paused)}
      onPlay={() => setPlayState(PlayState.playing)}
      onEnded={() => setPlayState(PlayState.ended)}
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

import { useAtom } from 'jotai';
import styled from 'styled-components';
import { myScope, srcAtom, videoElemWriteAtom } from '@/lib/atoms';
import { SyntheticEvent } from 'react';

function HTMLVideoPlayer() {
  const [, setVideoElem] = useAtom(videoElemWriteAtom, myScope);
  const [src, setSrc] = useAtom(srcAtom, myScope);

  return (
    <HTMLPlayer
      onClick={() => console.log('🐭')}
      src={src}
      playsInline
      autoPlay
      onLoadedData={(e: SyntheticEvent<HTMLVideoElement, Event>) =>
        setVideoElem(e.target as HTMLVideoElement)
      }
      onLoadStart={(e: SyntheticEvent<HTMLVideoElement, Event>) => {
        setVideoElem(e.target as HTMLVideoElement);
        setSrc((e.target as HTMLVideoElement).src);
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

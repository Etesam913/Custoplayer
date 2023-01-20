import styled from 'styled-components';
import HTMLVideoPlayer from '@/lib/components/HTMLVideoPlayer';
import { useAtom } from 'jotai';
import { myScope, videoRefReadAtom } from '@/lib/atoms';
import { useEffect } from 'react';

function VideoPlayerWrapper() {
  const [videoRef] = useAtom(videoRefReadAtom, myScope);

  useEffect(() => {
    console.log(videoRef);
  }, [videoRef]);

  return (
    <PlayerWrapper>
      <PlayerContainer>
        <HTMLVideoPlayer />
      </PlayerContainer>
    </PlayerWrapper>
  );
}

const PlayerWrapper = styled.div`
  display: inline-block;
  position: relative;
  background: black;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
  overflow: hidden;
`;

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  color: white;
  overflow: hidden;
  z-index: 4;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:focus {
    outline: none;
  }
`;

export default VideoPlayerWrapper;

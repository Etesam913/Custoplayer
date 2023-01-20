import styled from 'styled-components';
import HTMLVideoPlayer from '@/lib/components/HTMLVideoPlayer';
import { useAtom } from 'jotai';
import { myScope, setControlsBarAtom, videoElemReadAtom } from '@/lib/atoms';
import ControlsBar from '@/lib/components/ControlsBar';
import { motion } from 'framer-motion';
import { useDimensions } from '../hooks';

function VideoPlayerWrapper() {
  const [videoElem] = useAtom(videoElemReadAtom, myScope);
  const [, setIsControlsBarShowing] = useAtom(setControlsBarAtom, myScope);
  useDimensions();

  return (
    <PlayerWrapper tabIndex={-1}>
      <PlayerContainer
        tabIndex={-1}
        onMouseEnter={() => setIsControlsBarShowing(true)}
        onMouseLeave={() => setIsControlsBarShowing(false)}
      >
        <HTMLVideoPlayer />
        {videoElem && <ControlsBar />}
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

export const ControlsContainer = styled(motion.div)`
  width: 100%;
  position: absolute;
  display: flex;
  z-index: 6;
  left: 0;
  bottom: 0;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

export default VideoPlayerWrapper;

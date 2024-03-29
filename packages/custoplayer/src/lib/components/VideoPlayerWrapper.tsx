import styled from 'styled-components';
import HTMLVideoPlayer from '@root/lib/components/HTMLVideoPlayer';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  focusedItemAtom,
  isFullscreenAtom,
  myScope,
  showControlsBarAtom,
  videoAttributesAtom,
  videoContainerAtom,
  videoElemAtom,
} from '@root/lib/atoms';
import ControlsBar from '@root/lib/components/ControlsBar';
import { motion } from 'framer-motion';
import { useDimensions, useFullscreenEvent } from '../hooks';

import { handleKeyPress } from '../utils';
import { useEffect, useRef } from 'react';
import PlayIndicator from './PlayIndicator';

function VideoPlayerWrapper() {
  const videoElem = useAtomValue(videoElemAtom, myScope);
  const setIsControlsBarShowing = useSetAtom(showControlsBarAtom, myScope);
  useDimensions();
  const setVideoContainer = useSetAtom(videoContainerAtom, myScope);
  const videoContainerRef = useRef(null);
  const setIsFullscreen = useSetAtom(isFullscreenAtom, myScope);

  useEffect(() => {
    if (videoContainerRef && videoContainerRef.current) {
      setVideoContainer(videoContainerRef.current);
    }
  }, [videoContainerRef, setVideoContainer]);

  useFullscreenEvent(setIsFullscreen);
  const { width, height } = useAtomValue(videoAttributesAtom, myScope);
  const focusedItem = useAtomValue(focusedItemAtom, myScope);
  return (
    <PlayerWrapper
      $width={width}
      $height={height}
      data-cy='videoPlayerWrapper'
      ref={videoContainerRef}
      onFocus={() => setIsControlsBarShowing(true)}
      onMouseEnter={() => {
        setIsControlsBarShowing(true);
      }}
      onMouseLeave={() => {
        setIsControlsBarShowing(false);
      }}
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
        handleKeyPress(e, videoElem, focusedItem)
      }
    >
      <PlayerContainer data-cy='playerContainer'>
        <PlayIndicator />
        <HTMLVideoPlayer />
        {videoElem && <ControlsBar />}
      </PlayerContainer>
    </PlayerWrapper>
  );
}

const PlayerWrapper = styled.div<{
  $width: string | number | undefined;
  $height: string | number | undefined;
}>`
  position: relative;
  background: black;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  height: ${(props) => (props.$height ? props.$height : '100%')};
  width: ${(props) => (props.$width ? props.$width : '100%')};
  :focus-visible {
    outline: 3.5px dashed ${(props) => props.theme.focusColor};
  }
`;

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  color: white;
  overflow: hidden;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  height: 100%;
  width: 100%;
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

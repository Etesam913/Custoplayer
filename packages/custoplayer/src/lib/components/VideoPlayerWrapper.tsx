import styled from 'styled-components';
import HTMLVideoPlayer from '@root/lib/components/HTMLVideoPlayer';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  focusedItemAtom,
  isFullscreenAtom,
  myScope,
  showControlsBarAtom,
  videoContainerAtom,
  videoElemAtom,
} from '@root/lib/atoms';
import ControlsBar from '@root/lib/components/ControlsBar';
import { motion } from 'framer-motion';
import { useDimensions, useFullscreenEvent } from '../hooks';

import { handleKeyPress } from '../utils';
//import PlayIndicator from './Indicator/PlayIndicator';
import { useEffect, useRef } from 'react';
import { wrapperFocusShadow, wrapperFocusTransition } from '../theme';

function VideoPlayerWrapper() {
  const videoElem = useAtomValue(videoElemAtom, myScope);
  const setIsControlsBarShowing = useSetAtom(showControlsBarAtom, myScope);
  useDimensions();
  const setVideoContainer = useSetAtom(videoContainerAtom, myScope);
  const videoContainerRef = useRef(null);
  const setIsFullscreen = useSetAtom(isFullscreenAtom, myScope);
  const [focusedItem, setFocusedItem] = useAtom(focusedItemAtom, myScope);

  useEffect(() => {
    if (videoContainerRef && videoContainerRef.current) {
      setVideoContainer(videoContainerRef.current);
    }
  }, [videoContainerRef]);

  useFullscreenEvent(setIsFullscreen);
  return (
    <PlayerWrapper
      data-cy='videoPlayerWrapper'
      ref={videoContainerRef}
      onFocus={() => {
        setIsControlsBarShowing(true);
        {
          /* setFocusedItem('playerWrapper'); */
        }
      }}
      onBlur={() => {
        setIsControlsBarShowing(false);
        {
          /* setFocusedItem(''); */
        }
      }}
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
        handleKeyPress(e, videoElem, focusedItem)
      }
    >
      <PlayerContainer
        data-cy='playerContainer'
        //tabIndex={-1}
        onMouseEnter={() => {
          setIsControlsBarShowing(true);
        }}
        onMouseLeave={() => {
          setIsControlsBarShowing(false);
        }}
      >
        {/* <PlayIndicator /> */}
        <HTMLVideoPlayer />
        {videoElem && <ControlsBar />}
      </PlayerContainer>
    </PlayerWrapper>
  );
}

const PlayerWrapper = styled.div`
  position: relative;
  background: black;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: ${wrapperFocusTransition};
  border-radius: 0.15rem;
  &:focus-visible {
    outline: none !important;
    box-shadow: ${wrapperFocusShadow};
    transition: ${wrapperFocusTransition};
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

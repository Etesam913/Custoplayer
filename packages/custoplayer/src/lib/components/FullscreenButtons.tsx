import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FullscreenItem } from '@root/types';
import { useAtomValue } from 'jotai';
import { isFullscreenAtom, myScope, videoContainerAtom } from '@root/lib/atoms';
import screenfull from 'screenfull';

interface FullscreenButtonsProps {
  item: FullscreenItem;
  isFullscreen: boolean;
}

function FullscreenButtons({ item, isFullscreen }: FullscreenButtonsProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const videoContainer = useAtomValue(videoContainerAtom, myScope);

  function handleFullscreen() {
    if (videoContainer && screenfull.isEnabled)
      screenfull.toggle(videoContainer);
  }

  return (
    <div>
      {item.id === 'fullscreenButton1' && (
        <FullscreenButtonContainer
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setIsMouseDown(false);
          }}
          onMouseDown={() => setIsMouseDown(true)}
          onMouseUp={() => setIsMouseDown(false)}
          onClick={handleFullscreen}
        >
          {isFullscreen ? (
            <svg
              width='32'
              height='32'
              viewBox='0 0 32 32'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <FullscreenPath
                animate={{
                  d: isHovered && !isMouseDown ? 'M29 3L19 13' : 'M29 3L21 11',
                }}
                d='M29 3L21 11'
              />
              <FullscreenPath
                animate={{
                  d: isHovered && !isMouseDown ? 'M19 13V7' : 'M21 11V7',
                }}
                d='M21 11V7'
              />
              <FullscreenPath
                animate={{
                  d: isHovered && !isMouseDown ? 'M19 13H25' : 'M21 11H25',
                }}
                d='M21 11H25'
              />
              <FullscreenPath
                animate={{
                  d: isHovered && !isMouseDown ? 'M3 29L13 19' : 'M3 29L11 21',
                }}
                d='M3 29L11 21'
              />
              <FullscreenPath
                animate={{
                  d: isHovered && !isMouseDown ? 'M13 19H7' : 'M11 21H7',
                }}
                d='M11 21H7'
              />
              <FullscreenPath
                animate={{
                  d: isHovered && !isMouseDown ? 'M13 19V25' : 'M11 21V25',
                }}
                d='M11 21V25'
              />
            </svg>
          ) : (
            <svg
              width='32'
              height='32'
              viewBox='0 0 32 32'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <FullscreenPath
                animate={{
                  d: isHovered && !isMouseDown ? 'M18 14L28 4' : 'M18 14L26 6',
                }}
              />
              <FullscreenPath
                animate={{
                  d: isHovered && !isMouseDown ? 'M28 4V10' : 'M26 6V10',
                }}
              />
              <FullscreenPath
                animate={{
                  d: isHovered && !isMouseDown ? 'M28 4H22' : 'M26 6H22',
                }}
              />

              <FullscreenPath
                animate={{
                  d: isHovered && !isMouseDown ? 'M14 18L4 28' : 'M14 18L6 26',
                }}
              />

              <FullscreenPath
                animate={{
                  d: isHovered && !isMouseDown ? 'M4 28H10' : 'M6 26H10',
                }}
              />

              <FullscreenPath
                animate={{
                  d: isHovered && !isMouseDown ? 'M4 28V22' : 'M6 26V22',
                }}
              />
            </svg>
          )}
        </FullscreenButtonContainer>
      )}
    </div>
  );
}

const FullscreenButtonContainer = styled.button`
  background: transparent;
  padding: 0;
  border: 0;
  color: currentColor;
  cursor: pointer;
  height: 32px;
  width: 32px;
`;

const FullscreenPath = styled(motion.path)`
  stroke: currentColor;
  stroke-width: 2.2;
  stroke-linecap: round;
`;

export default FullscreenButtons;

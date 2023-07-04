import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { myScope, videoContainerAtom, videoElemAtom } from '@root/lib/atoms';
import screenfull from 'screenfull';

interface FullscreenButtonsProps {
  item: { id: 'fullscreenButton1' | 'fullscreenButton2' };
  isFullscreen: boolean;
}

function FullscreenButtons({ item, isFullscreen }: FullscreenButtonsProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const videoElem = useAtomValue(videoElemAtom, myScope);
  const videoContainer = useAtomValue(videoContainerAtom, myScope);

  function handleFullscreen() {
    if (videoContainer && screenfull.isEnabled) {
      screenfull.toggle(videoContainer);
    } else if (videoContainer && videoElem && !screenfull.isEnabled) {
      videoElem.webkitEnterFullscreen();
    }
  }

  return (
    <>
      <FullscreenButtonContainer
        data-cy={item.id}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsMouseDown(false);
        }}
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}
        onClick={handleFullscreen}
      >
        {item.id === 'fullscreenButton1' &&
          (isFullscreen ? (
            <svg
              data-cy='fullscreenButton1-fullscreened'
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
              data-cy='fullscreenButton1-not-fullscreened'
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
          ))}

        {item.id === 'fullscreenButton2' &&
          (isFullscreen ? (
            <svg
              width='32'
              height='32'
              viewBox='0 0 32 32'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              data-cy='fullscreenButton2-fullscreened'
            >
              <FullscreenRect x='1' y='1' width='30' height='30' />
              <FullscreenRect
                x='1'
                initial={{ y: '18px', width: '12px', height: '13px' }}
                animate={{
                  width: isHovered && !isMouseDown ? '10px' : '12px',
                  height: isHovered && !isMouseDown ? '11px' : '13px',
                  y: isHovered && !isMouseDown ? '20px' : '18px',
                }}
              />
              <FullscreenPath
                animate={{
                  d: isHovered && !isMouseDown ? 'M26 5L16 15' : 'M26 5L18 13',
                }}
                d='M26 5L18 13'
              />
              <FullscreenPath
                animate={{
                  d: isHovered && !isMouseDown ? 'M16 15H22' : 'M18 13H22',
                }}
                d='M18 13H22'
              />
              <FullscreenPath
                animate={{
                  d: isHovered && !isMouseDown ? 'M16 15V9' : 'M18 13V9',
                }}
                d='M18 13V9'
              />
            </svg>
          ) : (
            <svg
              width='32'
              height='32'
              viewBox='0 0 32 32'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              data-cy='fullscreenButton2-not-fullscreened'
            >
              <FullscreenRect x='1' y='1' width='30' height='30' />
              <FullscreenRect
                x='1'
                initial={{ y: '8px' }}
                animate={{
                  y: isHovered && !isMouseDown ? '6px' : '8px',
                  width: isHovered ? '24px' : '21px',
                  height: isHovered ? '25px' : '23px',
                }}
              />
              <FullscreenPath
                animate={{
                  d: isHovered && !isMouseDown ? 'M7 24L17 14' : 'M7 24L15 16',
                }}
                d='M7 24L15 16'
              />
              <FullscreenPath
                animate={{
                  d: isHovered && !isMouseDown ? 'M17 14H11' : 'M15 16H11',
                }}
                d='M15 16H11'
              />
              <FullscreenPath
                animate={{
                  d: isHovered && !isMouseDown ? 'M17 14V20' : 'M15 16V20',
                }}
                d='M15 16V20'
              />
            </svg>
          ))}
      </FullscreenButtonContainer>
    </>
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
  :focus {
    outline: none;
  }
  :focus-visible {
    outline: 2.5px dashed ${(props) => props.theme.focusColor};
  }
`;

const FullscreenPath = styled(motion.path)`
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
`;

const FullscreenRect = styled(motion.rect)`
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
`;

export default FullscreenButtons;

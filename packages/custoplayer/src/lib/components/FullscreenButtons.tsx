import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FullscreenItem } from '@root/types';

interface FullscreenButtonsProps {
  item: FullscreenItem;
}

function FullscreenButtons({ item }: FullscreenButtonsProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <>
      {item.id === 'fullscreenButton1' && (
        <FullscreenButtonContainer
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setIsMouseDown(false);
          }}
          onMouseDown={() => setIsMouseDown(true)}
          onMouseUp={() => setIsMouseDown(false)}
          onClick={() => setIsFullscreen(!isFullscreen)}
        >
          {isFullscreen ? (
            <svg
              width='32'
              height='32'
              viewBox='0 0 32 32'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <FullscreenPath animate={{ d: isHovered && !isMouseDown ? "M29 3L19 13" : "M29 3L21 11" }} d="M29 3L21 11" />
              <FullscreenPath animate={{ d: isHovered && !isMouseDown ? "M19 13V7" : "M21 11V7" }} d="M21 11V7" />
              <FullscreenPath animate={{ d: isHovered && !isMouseDown ? "M19 13H25" : "M21 11H25" }} d="" />
              <FullscreenPath animate={{ d: isHovered && !isMouseDown ? "M4 28L14 18" : "M4 28L12 20" }} d="M4 28L12 20" />
              <FullscreenPath animate={{ d: isHovered && !isMouseDown ? "M14 18V24" : "M12 20V24" }} d="M12 20V24" />
              <FullscreenPath animate={{ d: isHovered && !isMouseDown ? "M14 18H8" : "M12 20H8" }} d="M12 20H8" />

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
`;

const FullscreenPath = styled(motion.path)`
  stroke: currentColor;
  stroke-width: 2.2;
  stroke-linecap: round;
`;

export default FullscreenButtons;

import { VolumeItem } from '@root/lib/types';
import { useAtom, useAtomValue } from 'jotai';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import {
  isMutedAtom,
  isVolumeDraggingAtom,
  isVolumeDraggingType,
  myScope,
  videoContainerAtom,
  videoElemAtom,
  volumeAtom,
} from '@root/lib/atoms';
import {
  clamp,
  BarMouseEvent,
  isTouchscreenFunc,
  isMouseFunc,
  isTouchscreen,
  barMouseDown,
} from '@root/lib/utils';
import VolumeBars from './VolumeBars';
import { motion, AnimatePresence } from 'framer-motion';
import { volumeBar1Animation, volumeBar2Animation } from '@root/lib/variants';

interface VolumeButtonsProps {
  item: VolumeItem;
}

function VolumeButtons({ item }: VolumeButtonsProps) {
  const [isVolumeHovered, setIsVolumeHovered] = useState(
    isTouchscreen() ? true : false,
  );
  const [isBarHovered, setIsBarHovered] = useState(false);
  const isMuted = useAtomValue(isMutedAtom, myScope);
  const volumeBarRef = useRef<HTMLDivElement | null>(null);
  const videoElem = useAtomValue(videoElemAtom, myScope);
  const volume = useAtomValue(volumeAtom, myScope);

  function handleProgressMouse(e: BarMouseEvent, videoContainerRect: DOMRect) {
    if (volumeBarRef && volumeBarRef.current) {
      let mousePos = 0;
      if (item.barId === 'volumeBar1') {
        if (isTouchscreenFunc(e)) mousePos = e.touches[0].clientX;
        else if (isMouseFunc(e)) mousePos = e.clientX;
      } else {
        if (isTouchscreenFunc(e)) mousePos = e.touches[0].clientY;
        else if (isMouseFunc(e)) mousePos = e.clientY;
      }

      setIsVolumeDragging(
        item.barId === 'volumeBar1' ? 'horizontal' : 'vertical',
      );
      const updatedMousePos =
        item.barId === 'volumeBar1'
          ? mousePos - videoContainerRect.left
          : mousePos - videoContainerRect.top;

      const volumeBarRect = volumeBarRef.current.getBoundingClientRect();
      const distVolumeBar =
        item.barId === 'volumeBar1'
          ? volumeBarRect.left - videoContainerRect.left
          : volumeBarRect.bottom - videoContainerRect.top;
      const mousePosConstant = item.barId === 'volumeBar1' ? 1 : -1;
      const volumeBarMaxVal =
        item.barId === 'volumeBar1'
          ? volumeBarRect.width
          : volumeBarRect.height;
      const adjustedMousePos =
        mousePosConstant * (updatedMousePos - distVolumeBar);
      const clampedMousePos = clamp(adjustedMousePos, 0, volumeBarMaxVal);

      const ratio = clamp(
        clampedMousePos /
          (item.barId === 'volumeBar1'
            ? volumeBarRef.current.clientWidth
            : volumeBarRef.current.clientHeight),
        0,
        1,
      );

      videoElem ? (videoElem.volume = ratio) : null;
      videoElem ? (videoElem.muted = false) : null;
    }
  }

  const videoContainer = useAtomValue(videoContainerAtom, myScope);
  const [isVolumeDragging, setIsVolumeDragging] = useAtom(
    isVolumeDraggingAtom,
    myScope,
  );

  return (
    <VolumeButtonBarContainer
      data-cy={`volumeButtonBarContainer-${item.id}`}
      isDragging={isVolumeDragging}
      onMouseEnter={() => setIsVolumeHovered(true)}
      onMouseLeave={() => setIsVolumeHovered(isTouchscreen() ? true : false)}
    >
      <ButtonContainer
        data-cy={item.id}
        whileHover={{ scale: 1.075 }}
        whileTap={{ scale: 0.925 }}
        onClick={() =>
          videoElem ? (videoElem.muted = !videoElem.muted) : null
        }
      >
        {(item.id === 'volumeButton1' || item.id === 'volumeButton2') && (
          <svg
            width='32'
            height='32'
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <VolumeButtonPath d='M5 12H9V20H5C4.44772 20 4 19.5523 4 19V13C4 12.4477 4.44772 12 5 12Z' />
            <VolumeButtonPath d='M9 13L15 7' />
            <VolumeButtonPath d='M15 7V26' />
            <VolumeButtonPath d='M9 20L15 26' />
            <AnimatePresence>
              {(volume === 0 || isMuted) && (
                <motion.g
                  initial={{ opacity: 0, scale: 0, x: -7 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0, x: -3 }}
                >
                  <VolumeButtonPath d='M21 13.5L28 20.5' />
                  <VolumeButtonPath d='M28 13.5L21 20.5' />
                </motion.g>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {volume > 0 && !isMuted && (
                <VolumeButtonPath
                  initial={{ opacity: 0, scale: 0, x: -7 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0, x: -3 }}
                  d='M19.5 13.5C21 14.6667 23.1 17.7 19.5 20.5'
                  id='custoplayer-arc1'
                />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {volume > 0.5 && !isMuted && (
                <VolumeButtonPath
                  initial={{ opacity: 0, scale: 0, x: -7 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0, x: -3 }}
                  d='M24 9.5C27.0185 11.7059 31.2444 17.7941 24 24.5'
                  id='custoplayer-arc2'
                />
              )}
            </AnimatePresence>
          </svg>
        )}
      </ButtonContainer>
      {(
        <AnimatePresence>
          {(isVolumeHovered || isVolumeDragging) && (
            <VolumeBarContainer
              variants={
                item.barId === 'volumeBar1'
                  ? volumeBar1Animation
                  : volumeBar2Animation
              }
              initial='init'
              animate='anim'
              exit='exit'
              data-cy='volumeContainer'
              onMouseEnter={() => setIsBarHovered(true)}
              onMouseLeave={() => setIsBarHovered(false)}
              onMouseDown={(e) =>
                barMouseDown(
                  e,
                  handleProgressMouse,
                  videoContainer,
                  setIsVolumeDragging,
                  false,
                )
              }
              onTouchStart={(e) => {
                setIsBarHovered(true);
                barMouseDown(
                  e,
                  handleProgressMouse,
                  videoContainer,
                  setIsVolumeDragging,
                  true,
                );
              }}
              onTouchEnd={() => setIsBarHovered(false)}
            >
              <VolumeBars
                barId={item.barId}
                isBarHovered={isBarHovered}
                isVolumeDragging={isVolumeDragging}
                barColor={item.barColor}
                volumeColor={item.volumeColor}
                scrubberColor={item.scrubberColor}
                scrubberBorderColor={item.scrubberBorderColor}
                ref={volumeBarRef}
              />
            </VolumeBarContainer>
          )}
        </AnimatePresence>
      ) ?? item.barId}
    </VolumeButtonBarContainer>
  );
}

const VolumeButtonBarContainer = styled.div<{
  isDragging: isVolumeDraggingType;
}>`
  height: 100%;
  width: auto;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: ${(props) =>
    props.isDragging
      ? props.isDragging === 'horizontal'
        ? 'col-resize'
        : 'row-resize'
      : 'auto'};
  color: currentColor;
`;

const VolumeBarContainer = styled(motion.div)`
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const VolumeButtonPath = styled(motion.path)`
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
`;

const ButtonContainer = styled(motion.button)`
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  padding: 0;
  cursor: pointer;
  color: inherit;
`;

export default VolumeButtons;

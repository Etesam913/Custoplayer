import { CustoplayerItem } from '@root/types';
import { motion } from 'framer-motion';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import {
  isVolumeDraggingAtom,
  myScope,
  videoContainerAtom,
  videoElemAtom,
  volumeAtom,
  volumeStrAtom,
} from '../atoms';
import { barMouseEvent, getSvgPath, clamp } from '../utils';

interface VolumeButtonsProps {
  item: CustoplayerItem;
}

function VolumeButtons({ item }: VolumeButtonsProps) {
  const [isBarHovered, setIsBarHovered] = useState(false);
  const volumeBarRef = useRef<HTMLDivElement | null>(null);
  const videoElem = useAtomValue(videoElemAtom, myScope);
  const setVolume = useSetAtom(volumeAtom, myScope);
  const volumeStr = useAtomValue(volumeStrAtom, myScope);

  function handleProgressMouse(mousePos: number, videoContainerRect: DOMRect) {
    if (volumeBarRef && volumeBarRef.current) {
      const volumeBarRect = volumeBarRef.current.getBoundingClientRect();
      const distLeftOfProgressBar =
        volumeBarRect.left - videoContainerRect.left;
      const distRightOfProgressBar = Math.abs(
        volumeBarRect.right - videoContainerRect.right,
      );
      const adjustedMousePos = mousePos - distLeftOfProgressBar;

      const largestProgressBarMousePos =
        videoContainerRect.width -
        distLeftOfProgressBar -
        distRightOfProgressBar;
      const clampedMousePos = clamp(adjustedMousePos, 0, 56);
      const ratio = clampedMousePos / volumeBarRef.current.clientWidth;
      // if (videoElem) {
      //   videoElem.currentTime = videoElem?.duration * ratio;
      // }
      setVolume(ratio);
    }
  }
  const videoContainer = useAtomValue(videoContainerAtom, myScope);
  const [isVolumeDragging, setIsVolumeDragging] = useAtom(
    isVolumeDraggingAtom,
    myScope,
  );

  return (
    <VolumeButtonContainer isDragging={isVolumeDragging}>
      {item.id === 'volumeButton1' && (
        <svg
          width='1.75rem'
          height='100%'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          {getSvgPath(
            'M18.2451 7.99993C19.036 9.13376 19.4998 10.5127 19.4998 11.9999C19.4998 13.4872 19.036 14.8661 18.2451 15.9999M12.1343 4.36561L8.96863 7.5313C8.79568 7.70425 8.7092 7.79073 8.60828 7.85257C8.51881 7.9074 8.42127 7.9478 8.31923 7.9723C8.20414 7.99993 8.08185 7.99993 7.83726 7.99993H6.1C5.53995 7.99993 5.25992 7.99993 5.04601 8.10892C4.85785 8.20479 4.70487 8.35777 4.60899 8.54594C4.5 8.75985 4.5 9.03987 4.5 9.59993V14.3999C4.5 14.96 4.5 15.24 4.60899 15.4539C4.70487 15.6421 4.85785 15.7951 5.04601 15.8909C5.25992 15.9999 5.53995 15.9999 6.1 15.9999H7.83726C8.08185 15.9999 8.20414 15.9999 8.31923 16.0276C8.42127 16.0521 8.51881 16.0925 8.60828 16.1473C8.7092 16.2091 8.79568 16.2956 8.96863 16.4686L12.1343 19.6342C12.5627 20.0626 12.7769 20.2768 12.9608 20.2913C13.1203 20.3038 13.2763 20.2392 13.3802 20.1175C13.5 19.9773 13.5 19.6744 13.5 19.0686V4.9313C13.5 4.32548 13.5 4.02257 13.3802 3.88231C13.2763 3.76061 13.1203 3.69602 12.9608 3.70858C12.7769 3.72305 12.5627 3.93724 12.1343 4.36561Z',
            '2.3',
          )}
        </svg>
      )}
      <VolumeBarContainer
        onMouseEnter={() => setIsBarHovered(true)}
        onMouseLeave={() => setIsBarHovered(false)}
        onMouseDown={(e) =>
          barMouseEvent(
            e,
            handleProgressMouse,
            videoContainer,
            setIsVolumeDragging,
          )
        }
      >
        <VolumeBar1
          ref={volumeBarRef}
          animate={{
            height: isBarHovered || isVolumeDragging ? '0.5rem' : '0.35rem',
          }}
        >
          <Progress style={{ width: volumeStr }} />
        </VolumeBar1>
      </VolumeBarContainer>
    </VolumeButtonContainer>
  );
}

const VolumeButtonContainer = styled.button<{ isDragging: boolean }>`
  height: 100%;
  width: auto;
  background-color: transparent;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: ${(props) => (props.isDragging ? 'col-resize' : 'pointer')};
  color: currentColor;
  padding: 0;
`;

const VolumeBarContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const VolumeBar1 = styled(motion.div)`
  height: 0.35rem;
  background-color: white;
  width: 3.5rem;
  border-radius: 0.35rem;
  margin-left: 0.35rem;
  display: flex;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  background-color: orange;
  width: 50%;
`;

export default VolumeButtons;

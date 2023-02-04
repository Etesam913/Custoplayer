import { CustoplayerItem } from '@/types';
import { motion } from 'framer-motion';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  myScope,
  progressAtom,
  progressBarActiveAtom,
  progressStrAtom,
  videoContainerAtom,
  videoElemAtom,
} from '@/lib/atoms';
import { barMouseEvent, clamp, debounce, throttle } from '@/lib/utils';

interface ProgressBarsProps {
  item: CustoplayerItem;
}

function ProgressBars({ item }: ProgressBarsProps) {
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useAtom(progressBarActiveAtom, myScope);
  const videoElem = useAtomValue(videoElemAtom, myScope);
  const setProgress = useSetAtom(progressAtom, myScope);
  const videoContainer = useAtomValue(videoContainerAtom, myScope);
  const progressStr = useAtomValue(progressStrAtom, myScope);

  function handleProgressMouse(mousePos: number, videoContainerRect: DOMRect) {
    if (progressBarRef && progressBarRef.current) {
      const progressBarRect = progressBarRef.current.getBoundingClientRect();
      const distLeftOfProgressBar =
        progressBarRect.left - videoContainerRect.left;
      const distRightOfProgressBar = Math.abs(
        progressBarRect.right - videoContainerRect.right,
      );

      const adjustedMousePos = mousePos - distLeftOfProgressBar;
      const largestProgressBarMousePos =
        videoContainerRect.width -
        distLeftOfProgressBar -
        distRightOfProgressBar;
      const clampedMousePos = clamp(
        adjustedMousePos,
        0,
        largestProgressBarMousePos,
      );
      const ratio = clampedMousePos / progressBarRef.current.clientWidth;
      if (videoElem) {
        videoElem.currentTime = videoElem?.duration * ratio;
      }
      setProgress(ratio);
    }
  }

  return (
    <ProgressBarContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={(e) => {
        videoElem?.pause();
        barMouseEvent(e, handleProgressMouse, setIsActive, videoContainer);
      }}
    >
      {item.id === 'progressBar1' && (
        <ProgressBar1
          ref={progressBarRef}
          role='progressbar'
          animate={{ height: isHovered || isActive ? '0.6rem' : '0.35rem' }}
        >
          <Progress style={{ width: progressStr }} />
        </ProgressBar1>
      )}
    </ProgressBarContainer>
  );
}

const ProgressBarContainer = styled.div`
  height: calc(100% - 0.15rem);
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ProgressBar1 = styled(motion.div)`
  display: flex;
  background-color: #f2f2f2;
  width: 100%;
  height: 0.35rem;
  border-radius: 0.7rem;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  background-color: #a2cba2;
`;

export default ProgressBars;

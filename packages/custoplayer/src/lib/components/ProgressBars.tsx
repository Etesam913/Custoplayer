import { CustoplayerItem } from '@/types';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import {
  getVideoContainerAtom,
  getVideoElemAtom,
  myScope,
  progressAtom,
} from '@/lib/atoms';
import { barMouseEvent, clamp } from '@/lib/utils';

interface ProgressBarsProps {
  item: CustoplayerItem;
}

function ProgressBars({ item }: ProgressBarsProps) {
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [videoElem] = useAtom(getVideoElemAtom, myScope);
  const [progress, setProgress] = useAtom(progressAtom, myScope);
  const [videoContainer] = useAtom(getVideoContainerAtom, myScope);

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

      const finalProgress = parseFloat((ratio * 100).toFixed(1));
      if (videoElem) {
        videoElem.currentTime = videoElem?.duration * ratio;
      }
      setProgress(finalProgress);
    }
  }

  if (item.id === 'progressBar1') {
    return (
      <ProgressBarContainer
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={(e) =>
          barMouseEvent(e, handleProgressMouse, setIsActive, videoContainer)
        }
      >
        <ProgressBar1
          ref={progressBarRef}
          role='progressbar'
          animate={{ height: isHovered || isActive ? '0.6rem' : '0.35rem' }}
        >
          <Progress style={{ width: progress + '%' }} />
        </ProgressBar1>
      </ProgressBarContainer>
    );
  } else {
    return <div>test</div>;
  }
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

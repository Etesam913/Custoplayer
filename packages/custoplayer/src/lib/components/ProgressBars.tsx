import { CustoplayerItem } from '@root/types';
import { motion } from 'framer-motion';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  isProgressDraggingAtom,
  myScope,
  PlayState,
  playStateAtom,
  progressAtom,
  progressStrAtom,
  videoContainerAtom,
  videoElemAtom,
} from '@root/lib/atoms';
import { barMouseEvent, clamp } from '@root/lib/utils';

interface ProgressBarsProps {
  item: CustoplayerItem;
}

function ProgressBars({ item }: ProgressBarsProps) {
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const videoElem = useAtomValue(videoElemAtom, myScope);
  const setProgress = useSetAtom(progressAtom, myScope);
  const videoContainer = useAtomValue(videoContainerAtom, myScope);
  const progressStr = useAtomValue(progressStrAtom, myScope);
  const playState = useAtomValue(playStateAtom, myScope);
  // Needed for remembering what play state to set after progress dragging is complete
  const [tempVideoPauseState, setTempVideoPauseState] = useState(0);
  const [isProgressDragging, setIsProgressDragging] = useAtom(
    isProgressDraggingAtom,
    myScope,
  );

  function handleProgressMouseMove(
    mousePos: number,
    videoContainerRect: DOMRect,
  ) {
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

  function handleProgressMouseUp() {
    if (
      tempVideoPauseState === PlayState.paused ||
      tempVideoPauseState === PlayState.ended
    )
      videoElem?.pause();
    else videoElem?.play();
  }

  useEffect(() => {
    if (isProgressDragging) {
      setTempVideoPauseState(playState);
      videoElem?.pause();
    } else {
      handleProgressMouseUp();
    }
  }, [isProgressDragging]);

  return (
    <ProgressBarContainer
      data-testid={item.id}
      isDragging={isProgressDragging}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={(e) =>
        barMouseEvent(
          e,
          handleProgressMouseMove,
          videoContainer,
          setIsProgressDragging,
        )
      }
    >
      {item.id === 'progressBar1' && (
        <ProgressBar1
          ref={progressBarRef}
          role='progressbar'
          animate={{
            height: isHovered || isProgressDragging ? '0.6rem' : '0.35rem',
          }}
        >
          <Progress
            style={{ width: progressStr }}
            progressColor={item.progressColor ?? 'rgb(81, 180, 122)'}
          />
        </ProgressBar1>
      )}
    </ProgressBarContainer>
  );
}

const ProgressBarContainer = styled.div<{ isDragging: boolean }>`
  height: calc(100% - 0.15rem);
  width: 100%;
  display: flex;
  align-items: center;
  cursor: ${(props) => (props.isDragging ? 'col-resize' : 'pointer')};
`;

const ProgressBar1 = styled(motion.div)`
  display: flex;
  background-color: #f2f2f2;
  width: 100%;
  height: 0.35rem;
  border-radius: 0.7rem;
  overflow: hidden;
`;

const Progress = styled.div<{ progressColor: string }>`
  height: 100%;
  background-color: ${(props) => props.progressColor};
`;

export default ProgressBars;

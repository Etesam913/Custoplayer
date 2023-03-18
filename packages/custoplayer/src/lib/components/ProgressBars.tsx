import {
  isProgressDraggingAtom,
  myScope,
  playStateAtom,
  previewTooltipPositionAtom,
  previewTooltipStrAtom,
  previewTooltipWidth,
  progressAtom,
  progressStrAtom,
  valuesAtom,
  videoContainerAtom,
  videoDimensionsAtom,
  videoElemAtom,
} from '@root/lib/atoms';
import {
  BarMouseEvent,
  barMouseEvent,
  clamp,
  formatTime,
  getLargestProgressBarMousePos,
} from '@root/lib/utils';
import { ProgressBarItem } from '@root/lib/types';
import { motion } from 'framer-motion';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { useProgressDragging } from '../hooks';
import PreviewTooltips from './PreviewTooltips';

interface ProgressBarsProps {
  item: ProgressBarItem;
}

function ProgressBars({ item }: ProgressBarsProps) {
  const values = useAtomValue(valuesAtom, myScope);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const videoElem = useAtomValue(videoElemAtom, myScope);
  const videoContainer = useAtomValue(videoContainerAtom, myScope);
  const setProgress = useSetAtom(progressAtom, myScope);
  const progressStr = useAtomValue(progressStrAtom, myScope);
  const playState = useAtomValue(playStateAtom, myScope);

  // Needed for remembering what play state to set after progress dragging is complete
  const [tempVideoPauseState, setTempVideoPauseState] = useState(-1);
  const [isProgressDragging, setIsProgressDragging] = useAtom(
    isProgressDraggingAtom,
    myScope,
  );
  const setPreviewTooltipPosition = useSetAtom(
    previewTooltipPositionAtom,
    myScope,
  );
  const setTooltipStr = useSetAtom(previewTooltipStrAtom, myScope);

  function handleProgressMouseMove(
    e: BarMouseEvent,
    videoContainerRect: DOMRect,
  ) {
    setIsProgressDragging(true);
    if (progressBarRef && progressBarRef.current) {
      const mousePos = e.clientX;
      const progressBarRect = progressBarRef.current.getBoundingClientRect();
      const [largestProgressBarMousePos, distLeftOfProgressBar, _] =
        getLargestProgressBarMousePos(videoContainerRect, progressBarRect);

      const updatedMousePos = mousePos - videoContainerRect.left;

      handleMouseMove(e);
      const adjustedMousePos = updatedMousePos - distLeftOfProgressBar;
      const clampedMousePos = clamp(
        adjustedMousePos,
        0,
        largestProgressBarMousePos,
      );

      const ratio = clampedMousePos / progressBarRef.current.clientWidth;
      if (videoElem && videoElem.duration) {
        const currentTime = videoElem.duration * ratio;
        videoElem.currentTime = currentTime;
        setTooltipStr(formatTime(currentTime));
      }

      setProgress(ratio);
    }
  }
  /* Shows the preview thumbnail when mouse is over progress bar */
  function handleMouseMove(e: BarMouseEvent) {
    if (
      isProgressDragging ||
      !progressBarRef ||
      !progressBarRef.current ||
      !videoContainer
    )
      return;
    const progressBarRect = progressBarRef.current.getBoundingClientRect();
    const widthOfItemsToLeftOfProgressBar =
      progressBarRef.current.getBoundingClientRect().left -
      videoContainer?.getBoundingClientRect().left;
    const widthOfItemsToRightOfProgressBar =
      videoContainer?.getBoundingClientRect().right -
      progressBarRef.current.getBoundingClientRect().right;
    const defaultHoverPos = e.clientX - progressBarRect.left;
    let hoverPos = e.clientX - progressBarRect.left - previewTooltipWidth / 2;
    const modifiedUpperBound =
      progressBarRef.current?.clientWidth -
      previewTooltipWidth / 2 +
      widthOfItemsToRightOfProgressBar;
    const maxHoverPos =
      progressBarRef.current.clientWidth - previewTooltipWidth / 2;
    const minHoverPos = Math.max(
      (-1 * previewTooltipWidth) / 2,
      -1 * widthOfItemsToLeftOfProgressBar,
    );

    if (defaultHoverPos > modifiedUpperBound) {
      hoverPos = modifiedUpperBound - previewTooltipWidth / 2;
    }
    hoverPos = clamp(hoverPos, minHoverPos, maxHoverPos);
    setPreviewTooltipPosition(hoverPos);

    const leftDist = progressBarRef.current.getBoundingClientRect().left;
    const timePos = e.clientX - leftDist;
    if (videoElem && videoElem.duration) {
      const ratio = clamp(timePos / progressBarRef.current.clientWidth, 0, 1);
      const currentTime = videoElem.duration * ratio;
      setTooltipStr(formatTime(currentTime));
    }
  }

  // Handles play state when progress bar is being dragged
  useProgressDragging(
    tempVideoPauseState,
    videoElem,
    isProgressDragging,
    setTempVideoPauseState,
    playState,
  );

  return (
    <ProgressBarContainer
      data-cy={item.id}
      isDragging={isProgressDragging}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
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
          transition={{ duration: 0.2 }}
        >
          <Progress
            style={{ width: progressStr }}
            progressColor={item.progressColor}
          />
          {values.previewTooltip && (
            <PreviewTooltips
              isHovered={isHovered}
              isProgressDragging={isProgressDragging}
              data={values.previewTooltip}
            />
          )}
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
  border-radius: 0.7rem;
  overflow: hidden;
`;

const Progress = styled.div<{ progressColor: string | undefined }>`
  height: 100%;
  pointer-events: none;
  background-color: ${(props) =>
    props.progressColor ? props.progressColor : '#4ab860'};
`;

export default ProgressBars;

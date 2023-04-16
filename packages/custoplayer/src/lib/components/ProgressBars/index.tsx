import {
  isProgressDraggingAtom,
  myScope,
  playStateAtom,
  previewTooltipPositionAtom,
  previewTooltipStrAtom,
  previewTooltipWidth,
  progressAtom,
  videoContainerAtom,
  videoElemAtom,
} from '@root/lib/atoms';
import {
  BarMouseEvent,
  barMouseEvent,
  clamp,
  formatTime,
  getLargestProgressBarMousePos,
  isMouseFunc,
  isTouchscreenFunc,
} from '@root/lib/utils';
import { ProgressBarItem } from '@root/lib/types';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { useProgressDragging } from '../../hooks';
import ProgressBar1 from './ProgressBar1';
import ProgressBar2 from './ProgressBar2';

interface ProgressBarsProps {
  item: ProgressBarItem;
}

function ProgressBars({ item }: ProgressBarsProps) {
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const videoElem = useAtomValue(videoElemAtom, myScope);
  const videoContainer = useAtomValue(videoContainerAtom, myScope);
  const setProgress = useSetAtom(progressAtom, myScope);
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
      let xPos = 0;
      if (isTouchscreenFunc(e)) xPos = e.touches[0].clientX;
      else if (isMouseFunc(e)) xPos = e.clientX;
      const progressBarRect = progressBarRef.current.getBoundingClientRect();
      const [largestProgressBarMousePos, distLeftOfProgressBar, _] =
        getLargestProgressBarMousePos(videoContainerRect, progressBarRect);

      const updatedMousePos = xPos - videoContainerRect.left;

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
    let xPos = 0;
    if (isTouchscreenFunc(e)) xPos = e.touches[0].clientX;
    else if (isMouseFunc(e)) xPos = e.clientX;
    const progressBarRect = progressBarRef.current.getBoundingClientRect();
    const widthOfItemsToLeftOfProgressBar =
      progressBarRef.current.getBoundingClientRect().left -
      videoContainer?.getBoundingClientRect().left;
    const widthOfItemsToRightOfProgressBar =
      videoContainer?.getBoundingClientRect().right -
      progressBarRef.current.getBoundingClientRect().right;
    const defaultHoverPos = xPos - progressBarRect.left;
    let hoverPos = xPos - progressBarRect.left - previewTooltipWidth / 2;
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
    const timePos = xPos - leftDist;
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

  const shouldAnimate = isHovered || isProgressDragging;
  const hasScrubber =
    item.scrubberColor !== 'transparent' &&
    item.scrubberBorderColor !== 'transparent';

  return (
    <ProgressBarContainer
      data-cy={item.id}
      isDragging={isProgressDragging}
      onTouchStart={(e) => {
        setIsHovered(true);
        barMouseEvent(
          e,
          handleProgressMouseMove,
          videoContainer,
          setIsProgressDragging,
          true,
        );
      }}
      onTouchEnd={() => setIsHovered(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={(e) =>
        barMouseEvent(
          e,
          handleProgressMouseMove,
          videoContainer,
          setIsProgressDragging,
          false,
        )
      }
    >
      {item.id === 'progressBar1' && (
        <ProgressBar1
          hasScrubber={hasScrubber}
          shouldAnimate={shouldAnimate}
          item={item}
          isProgressDragging={isProgressDragging}
          isHovered={isHovered}
          ref={progressBarRef}
        />
      )}

      {item.id === 'progressBar2' && (
        <ProgressBar2
          hasScrubber={false}
          shouldAnimate={shouldAnimate}
          item={item}
          isProgressDragging={isProgressDragging}
          isHovered={isHovered}
          ref={progressBarRef}
        />
      )}
    </ProgressBarContainer>
  );
}

const ProgressBarContainer = styled.div<{ isDragging: boolean }>`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: ${(props) => (props.isDragging ? 'col-resize' : 'pointer')};
`;

export default ProgressBars;

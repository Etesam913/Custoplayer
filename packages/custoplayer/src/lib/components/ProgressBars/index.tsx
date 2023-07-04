import {
  focusedItemAtom,
  isProgressDraggingAtom,
  isVolumeDraggingAtom,
  myScope,
  playStateAtom,
  previewTooltipHoveredTimeAtom,
  previewTooltipPositionAtom,
  progressAtom,
  valuesAtom,
  videoContainerAtom,
  videoElemAtom,
} from '@root/lib/atoms';
import {
  barMouseDown,
  BarMouseEvent,
  handleProgressBarMouseMove,
  showPreviewThumbnail,
} from '@root/lib/utils';
import { ProgressBarItem } from '@root/lib/types';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { useProgressDragging } from '../../hooks';
import ProgressBar1 from './ProgressBar1';
import ProgressBar2 from './ProgressBar2';
import ProgressBar3 from './ProgressBar3';

interface ProgressBarsProps {
  item: ProgressBarItem;
  isOnTop?: boolean;
}

const previewTooltip2Height = 150;
const previewTooltip1Height = 60;

function ProgressBars({ item, isOnTop = false }: ProgressBarsProps) {
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const videoElem = useAtomValue(videoElemAtom, myScope);
  const videoContainer = useAtomValue(videoContainerAtom, myScope);
  const setProgress = useSetAtom(progressAtom, myScope);
  const playState = useAtomValue(playStateAtom, myScope);
  const values = useAtomValue(valuesAtom, myScope);
  const setFocusedItem = useSetAtom(focusedItemAtom, myScope);

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
  const setPreviewTooltipHoveredTime = useSetAtom(
    previewTooltipHoveredTimeAtom,
    myScope,
  );
  const isVolumeDragging = useAtomValue(isVolumeDraggingAtom, myScope);
  /**
  A wrapper function for handleProgressBarMouseMove that passes in the
  video container's bounding rect. It is the callback function for
  the barMouseDown
  */
  function handleProgressBarMouseMoveWrapper(
    e: BarMouseEvent,
    videoContainerRect: DOMRect,
  ) {
    handleProgressBarMouseMove(
      e,
      videoContainerRect,
      isProgressDragging,
      progressBarRef,
      videoContainer,
      videoElem,
      values.previewTooltip?.id === 'text'
        ? previewTooltip1Height
        : previewTooltip2Height,
      setProgress,
      setIsProgressDragging,
      setPreviewTooltipHoveredTime,
      setPreviewTooltipPosition,
    );
  }

  // Handles play state when progress bar is being dragged
  useProgressDragging(
    tempVideoPauseState,
    videoElem,
    isProgressDragging,
    setTempVideoPauseState,
    playState,
  );

  const shouldAnimate = (isHovered || isProgressDragging) && !isVolumeDragging;
  const hasScrubber = !(
    item.scrubberColor === 'transparent' &&
    (item.scrubberBorderColor === 'transparent' ||
      item.scrubberBorderColor === 'none' ||
      item.scrubberBorderColor === undefined)
  );

  return (
    <ProgressBarContainer
      tabIndex={0}
      onFocus={() => setFocusedItem('progressBar')}
      $isOnTop={isOnTop}
      $isDragging={isProgressDragging}
      data-cy={item.id}
      onTouchStart={(e) => {
        setIsHovered(true);
        barMouseDown(
          e,
          handleProgressBarMouseMoveWrapper,
          videoContainer,
          setIsProgressDragging,
          true,
        );
      }}
      onTouchEnd={() => setIsHovered(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={(e) =>
        showPreviewThumbnail(
          e,
          isProgressDragging,
          progressBarRef,
          videoContainer,
          videoElem,
          values.previewTooltip?.id === 'text'
            ? previewTooltip1Height
            : previewTooltip2Height,
          setPreviewTooltipHoveredTime,
          setPreviewTooltipPosition,
        )
      }
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={(e) =>
        barMouseDown(
          e,
          handleProgressBarMouseMoveWrapper,
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
          isHovered={isHovered && !isVolumeDragging}
          ref={progressBarRef}
        />
      )}

      {item.id === 'progressBar2' && (
        <ProgressBar2
          hasScrubber={false}
          shouldAnimate={shouldAnimate}
          item={item}
          isProgressDragging={isProgressDragging}
          isHovered={isHovered && !isVolumeDragging}
          ref={progressBarRef}
        />
      )}

      {item.id === 'progressBar3' && (
        <ProgressBar3
          hasScrubber={false}
          shouldAnimate={shouldAnimate}
          item={item}
          isProgressDragging={isProgressDragging}
          isHovered={isHovered && !isVolumeDragging}
          ref={progressBarRef}
        />
      )}
    </ProgressBarContainer>
  );
}

const ProgressBarContainer = styled.div<{
  $isDragging: boolean;
  $isOnTop: boolean;
}>`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: ${(props) => (props.$isOnTop ? 'flex-end' : 'center')};
  cursor: ${(props) => (props.$isDragging ? 'col-resize' : 'pointer')};
  :focus {
    outline: none;
  }
  :focus-visible {
    outline: 2.5px dashed ${(props) => props.theme.focusColor};
  }
`;

export default ProgressBars;

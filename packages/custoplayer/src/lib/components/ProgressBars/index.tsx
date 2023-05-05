import {
  isProgressDraggingAtom,
  myScope,
  playStateAtom,
  previewTooltipPositionAtom,
  previewTooltipStrAtom,
  progressAtom,
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
  onTop?: boolean;
}

function ProgressBars({ item, onTop = false }: ProgressBarsProps) {
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
      setProgress,
      setIsProgressDragging,
      setTooltipStr,
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

  const shouldAnimate = isHovered || isProgressDragging;
  const hasScrubber =
    item.scrubberColor !== 'transparent' &&
    item.scrubberBorderColor !== 'transparent';

  return (
    <ProgressBarContainer
      onTop={onTop}
      data-cy={item.id}
      isDragging={isProgressDragging}
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
          setTooltipStr,
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

      {item.id === 'progressBar3' && (
        <ProgressBar3
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

const ProgressBarContainer = styled.div<{
  isDragging: boolean;
  onTop: boolean;
}>`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: ${(props) => (props.onTop ? 'flex-end' : 'center')};
  cursor: ${(props) => (props.isDragging ? 'col-resize' : 'pointer')};
`;

export default ProgressBars;

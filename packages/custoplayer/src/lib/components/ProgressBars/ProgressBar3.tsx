import { forwardRef } from 'react';
import { ProgressBarItem } from '@root/lib/types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import PreviewTooltips from '@root/lib/components/PreviewTooltips';
import { useAtomValue } from 'jotai';
import {
  myScope,
  progressBufferPercentAtom,
  progressStrAtom,
  valuesAtom,
} from '@root/lib/atoms';

interface ProgressBarProps {
  hasScrubber: boolean;
  shouldAnimate: boolean;
  item: ProgressBarItem;
  isProgressDragging: boolean;
  isHovered: boolean;
}
type Ref = HTMLDivElement;

const ProgressBar3 = forwardRef<Ref, ProgressBarProps>((props, ref) => {
  const progressStr = useAtomValue(progressStrAtom, myScope);
  const values = useAtomValue(valuesAtom, myScope);
  const progressBufferPercent = useAtomValue(
    progressBufferPercentAtom,
    myScope,
  );

  return (
    <Bar3
      ref={ref}
      role='progressbar'
      $barBorderColor={props.item.barBorderColor}
      $barColor={props.item.barColor}
    >
      <ProgressContainer>
        <ProgressBuffer
          data-cy='progressBuffer3'
          style={{
            width: `clamp(0%, ${progressBufferPercent}%, 100%)`,
          }}
          $bufferedColor={props.item.bufferedColor}
        />

        <Progress
          data-cy='progress3'
          style={{
            width: `clamp(0%, ${progressStr}, 100%)`,
          }}
          $progressColor={props.item.progressColor}
        />
      </ProgressContainer>
      {values.previewTooltip && (
        <PreviewTooltips
          isHovered={props.isHovered}
          isProgressDragging={props.isProgressDragging}
          data={values.previewTooltip}
        />
      )}
    </Bar3>
  );
});

const Bar3 = styled(motion.div)<{
  $barColor: string | undefined;
  $barBorderColor: string | undefined;
}>`
  display: flex;
  background-color: ${(props) =>
    props.$barColor ? props.$barColor : 'transparent'};
  width: 100%;
  height: 1.25rem;
  justify-content: flex-start;
  border-radius: 1rem;
  border: 3px solid ${(props) => props.$barBorderColor};
  position: relative;
`;

const ProgressBuffer = styled.div<{
  $bufferedColor: string | undefined;
}>`
  position: absolute;
  pointer-events: none;
  height: 100%;
  background-color: ${(props) =>
    props.$bufferedColor ? props.$bufferedColor : 'rgba(0,0,0,0.4)'};
  z-index: 1;
  height: 35%;
  border-radius: 0.4rem;
`;

const Progress = styled.div<{
  $progressColor: string | undefined;
}>`
  height: 35%;
  pointer-events: none;
  position: absolute;
  z-index: 2;
  border-radius: 0.4rem;
  background-color: ${(props) =>
    props.$progressColor ? props.$progressColor : '#4ab860'};
`;

const ProgressContainer = styled.div`
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
`;

ProgressBar3.displayName = 'ProgressBar3';
export default ProgressBar3;

import { forwardRef } from 'react';
import { ProgressBarItem } from '@root/lib/types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import PreviewTooltips from '@root/lib/components/PreviewTooltips';
import { useAtomValue } from 'jotai';
import { myScope, progressStrAtom, valuesAtom } from '@root/lib/atoms';

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
  return (
    <Bar3
      ref={ref}
      role='progressbar'
      barBorderColor={props.item.barBorderColor}
      barColor={props.item.barColor}
    >
      <Progress
        hasScrubber={props.hasScrubber}
        style={{
          width: props.hasScrubber ? `${progressStr}px` : progressStr,
        }}
        progressColor={props.item.progressColor}
      />
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
  barColor: string | undefined;
  barBorderColor: string | undefined;
}>`
  display: flex;
  background-color: ${(props) =>
    props.barColor ? props.barColor : 'transparent'};
  width: 100%;
  height: 65%;
  justify-content: flex-start;
  border-radius: 1rem;
  align-items: center;
  border: 3px solid ${(props) => props.barBorderColor};
  padding: 0 0.5rem;
`;

const Progress = styled.div<{
  progressColor: string | undefined;
  hasScrubber: boolean;
}>`
  height: 35%;
  pointer-events: none;
  display: flex;
  justify-content: flex-end;
  border-radius: 0.4rem;
  align-items: center;
  background-color: ${(props) =>
    props.progressColor ? props.progressColor : '#4ab860'};
`;

ProgressBar3.displayName = 'ProgressBar3';
export default ProgressBar3;

import {
  myScope,
  progressBufferPercentAtom,
  progressStrAtom,
  valuesAtom,
} from '@root/lib/atoms';
import { ProgressBarItem } from '@root/lib/types';
import { motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { forwardRef } from 'react';
import styled from 'styled-components';
import PreviewTooltips from '@root/lib/components/PreviewTooltips';

type Ref = HTMLDivElement;

interface ProgressBarProps {
  hasScrubber: boolean;
  shouldAnimate: boolean;
  item: ProgressBarItem;
  isProgressDragging: boolean;
  isHovered: boolean;
}

const ProgressBar2 = forwardRef<Ref, ProgressBarProps>((props, ref) => {
  const progressStr = useAtomValue(progressStrAtom, myScope);
  const values = useAtomValue(valuesAtom, myScope);
  const progressBufferPercent = useAtomValue(
    progressBufferPercentAtom,
    myScope,
  );

  return (
    <Bar2 ref={ref} role='progressbar' barColor={props.item.barColor}>
      <ProgressBuffer
        data-cy='progressBuffer2'
        width={`${progressBufferPercent}%`}
        bufferedColor={props.item.bufferedColor}
      />
      <Progress
        data-cy='progress2'
        hasScrubber={props.hasScrubber}
        style={{
          width: props.hasScrubber ? `calc(${progressStr} + 6px)` : progressStr,
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
    </Bar2>
  );
});

const Bar2 = styled(motion.div)<{ barColor: string | undefined }>`
  display: flex;
  background-color: ${(props) => (props.barColor ? props.barColor : '#f2f2f2')};
  width: 100%;
  height: 1.4rem;
  justify-content: flex-start;
  position: relative;
`;

const Progress = styled.div<{
  progressColor: string | undefined;
  hasScrubber: boolean;
}>`
  height: 100%;
  pointer-events: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  z-index: 2;
  background-color: ${(props) =>
    props.progressColor ? props.progressColor : '#4ab860'};
`;

const ProgressBuffer = styled.div<{
  width: string;
  bufferedColor: string | undefined;
}>`
  position: absolute;
  pointer-events: none;
  height: 100%;
  width: ${(props) => props.width};
  background-color: ${(props) =>
    props.bufferedColor ? props.bufferedColor : 'rgba(0,0,0,0.2)'};
  z-index: 1;
`;

ProgressBar2.displayName = 'ProgressBar2';
export default ProgressBar2;

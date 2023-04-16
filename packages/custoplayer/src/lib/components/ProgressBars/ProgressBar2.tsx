import { myScope, progressStrAtom } from '@root/lib/atoms';
import { ProgressBarItem } from '@root/lib/types';
import { motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { forwardRef } from 'react';
import styled, { css } from 'styled-components';

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
  return (
    <Bar2 ref={ref} role='progressbar' barColor={props.item.barColor}>
      <Progress
        hasScrubber={props.hasScrubber}
        style={{
          width: props.hasScrubber ? `calc(${progressStr} + 6px)` : progressStr,
        }}
        progressColor={props.item.progressColor}
      ></Progress>
    </Bar2>
  );
});

const Bar2 = styled(motion.div)<{ barColor: string | undefined }>`
  display: flex;
  background-color: ${(props) => (props.barColor ? props.barColor : '#f2f2f2')};
  width: 100%;
  height: 65%;
  justify-content: flex-start;
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
  background-color: ${(props) =>
    props.progressColor ? props.progressColor : '#4ab860'};
`;
const Indicator = styled.div`
  background-color: black;
`;

ProgressBar2.displayName = 'ProgressBar2';
export default ProgressBar2;
